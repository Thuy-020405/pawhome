import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index.ts';
import { services, experts, articles, bookings, users } from './src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON body parsing
  app.use(express.json());

  // 1. HEALTH CHECK
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. FETCH ALL SERVICES
  app.get('/api/services', async (req, res) => {
    try {
      const allServices = await db.select().from(services);
      res.json(allServices);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Database query failed. Please try again later.' });
    }
  });

  // 3. FETCH SINGLE SERVICE BY ID
  app.get('/api/services/:id', async (req, res) => {
    try {
      const serviceId = req.params.id;
      const result = await db.select().from(services).where(eq(services.id, serviceId));
      if (result.length === 0) {
        return res.status(404).json({ error: `Service with ID ${serviceId} not found` });
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Error fetching service details:', error);
      res.status(500).json({ error: 'Database query failed.' });
    }
  });

  // 4. FETCH ALL EXPERTS
  app.get('/api/experts', async (req, res) => {
    try {
      const allExperts = await db.select().from(experts);
      res.json(allExperts);
    } catch (error) {
      console.error('Error fetching experts:', error);
      res.status(500).json({ error: 'Database query failed.' });
    }
  });

  // 5. FETCH ALL ARTICLES
  app.get('/api/articles', async (req, res) => {
    try {
      const allArticles = await db.select().from(articles).orderBy(desc(articles.publishedAt));
      res.json(allArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Database query failed.' });
    }
  });

  // 6. SYNC AUTHENTICATED USER PROFILE
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: No user decoded' });
      }
      const { uid, email, name } = req.user;
      if (!email) {
        return res.status(400).json({ error: 'Email is required from Firebase Auth' });
      }
      const dbUser = await getOrCreateUser(uid, email, name);
      res.json(dbUser);
    } catch (error: any) {
      console.error('Error synchronizing user:', error);
      res.status(500).json({ error: error.message || 'Synchronization failed.' });
    }
  });

  // 7. FETCH BOOKINGS FOR AUTHENTICATED USER
  app.get('/api/bookings', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the user's DB ID from their Firebase UID
      const userResult = await db.select().from(users).where(eq(users.uid, req.user.uid));
      if (userResult.length === 0) {
        return res.status(404).json({ error: 'User not synchronized in database' });
      }

      const dbUserId = userResult[0].id;

      // Select bookings, joining with service & expert details
      const userBookings = await db.select({
        id: bookings.id,
        petType: bookings.petType,
        petName: bookings.petName,
        bookingDate: bookings.bookingDate,
        timeSlot: bookings.timeSlot,
        price: bookings.price,
        status: bookings.status,
        notes: bookings.notes,
        contactPhone: bookings.contactPhone,
        serviceId: bookings.serviceId,
        serviceName: services.name,
        expertId: bookings.expertId,
        expertName: experts.name,
      })
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .leftJoin(experts, eq(bookings.expertId, experts.id))
      .where(eq(bookings.userId, dbUserId))
      .orderBy(desc(bookings.createdAt));

      res.json(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Database query failed.' });
    }
  });

  // 8. ADD NEW BOOKING
  app.post('/api/bookings', async (req, res) => {
    try {
      const {
        petType,
        petName,
        serviceId,
        expertId,
        bookingDate,
        timeSlot,
        price,
        notes,
        contactPhone,
      } = req.body;

      let dbUserId: number | null = null;

      // Extract bearer token if present to associate booking with logged-in user
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split('Bearer ')[1];
        try {
          const { adminAuth } = await import('./src/lib/firebase-admin.ts');
          const decodedToken = await adminAuth.verifyIdToken(token);
          const userResult = await db.select().from(users).where(eq(users.uid, decodedToken.uid));
          if (userResult.length > 0) {
            dbUserId = userResult[0].id;
          }
        } catch (authError) {
          console.warn('Invalid authorization token provided for booking; continuing as guest', authError);
        }
      }

      // Find service and expert models to ensure ID validity
      const serviceMatches = await db.select().from(services).where(eq(services.id, serviceId));
      if (serviceMatches.length === 0) {
        // Fallback to name match if sent as string title from old static formats
        const serviceByName = await db.select().from(services).where(eq(services.name, serviceId));
        if (serviceByName.length === 0) {
          return res.status(400).json({ error: `Invalid service identifier: ${serviceId}` });
        }
      }

      const inserted = await db.insert(bookings)
        .values({
          userId: dbUserId,
          petType,
          petName,
          serviceId,
          expertId: expertId || null,
          bookingDate,
          timeSlot,
          price,
          status: 'upcoming',
          notes: notes || null,
          contactPhone,
        })
        .returning();

      res.status(201).json(inserted[0]);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Database insert failed.' });
    }
  });

  // 9. CANCEL BOOKING
  app.post('/api/bookings/:id/cancel', async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id, 10);
      if (isNaN(bookingId)) {
        return res.status(400).json({ error: 'Invalid booking ID' });
      }

      const updated = await db.update(bookings)
        .set({ status: 'cancelled' })
        .where(eq(bookings.id, bookingId))
        .returning();

      if (updated.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(updated[0]);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      res.status(500).json({ error: 'Database update failed.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
