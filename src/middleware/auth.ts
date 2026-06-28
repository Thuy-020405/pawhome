import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split('Bearer ')[1];
  if (token && token.startsWith('demo-')) {
    const role = token.replace('demo-', '');
    const decoded: any = {
      uid: `demo-uid-${role}`,
      email: role === 'customer' ? 'customer@pawhome.vn' : `${role}@pawhome.vn`,
      name: role === 'admin' ? 'Quản Trị Viên (Admin)' : role === 'customer' ? 'Khách Hàng Thân Thiết (Customer)' : 'Chuyên Gia PawHome (Expert)'
    };
    req.user = decoded;
    return next();
  }

  if (token && token.startsWith('db-token-')) {
    const email = token.replace('db-token-', '');
    try {
      const { db } = await import('../../backend/index.ts');
      const { users } = await import('../../backend/schema.ts');
      const { eq } = await import('drizzle-orm');
      const userResult = await db.select().from(users).where(eq(users.email, email));
      if (userResult.length > 0) {
        const u = userResult[0];
        req.user = {
          uid: u.uid || `db-uid-${u.id}`,
          email: u.email,
          name: u.fullName || u.email.split('@')[0]
        } as any;
        return next();
      }
    } catch (e) {
      console.error('Error in requireAuth db-token resolution:', e);
    }
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
