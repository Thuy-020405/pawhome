import { pgTable, serial, text, varchar, integer, numeric, timestamp, jsonb, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. BẢNG NGƯỜI DÙNG (Users)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }), // Nullable because of social / Firebase login
  fullName: varchar('full_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 20 }).default('client'), // 'client' hoặc 'admin'
  uid: varchar('uid', { length: 255 }).unique(), // Firebase Auth UID
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. BẢNG DỊCH VỤ (Services)
export const services = pgTable('services', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  basePrice: integer('base_price').notNull(),
  image: varchar('image', { length: 512 }),
  tagline: varchar('tagline', { length: 100 }).default('DỊCH VỤ TIÊU ĐIỂM PAWHOME'),
  subtitle: varchar('subtitle', { length: 255 }),
  heroDescription: text('hero_description'),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('5.0'),
  reviewsCount: integer('reviews_count').default(0),
  ctaPrimary: jsonb('cta_primary'),
  ctaSecondary: jsonb('cta_secondary'),
  highlights: jsonb('highlights'),
  processSteps: jsonb('process_steps'),
  processNote: text('process_note'),
  pricing: jsonb('pricing'),
});

// 3. BẢNG CHUYÊN GIA (Experts)
export const experts = pgTable('experts', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  title: varchar('title', { length: 150 }),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('5.0'),
  reviewsCount: integer('reviews_count').default(0),
  image: varchar('image', { length: 512 }),
  tags: text('tags').array(), // Danh sách chuyên môn
});

// 4. BẢNG ĐẶT LỊCH HẸN (Bookings)
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  petType: varchar('pet_type', { length: 50 }).notNull(), // 'Chó', 'Mèo', 'Thỏ', 'Khác'
  petName: varchar('pet_name', { length: 100 }).notNull(),
  serviceId: varchar('service_id', { length: 50 }).references(() => services.id),
  expertId: varchar('expert_id', { length: 50 }).references(() => experts.id),
  bookingDate: date('booking_date', { mode: 'string' }).notNull(),
  timeSlot: varchar('time_slot', { length: 10 }).notNull(), // Ví dụ: '09:30'
  price: integer('price').notNull(),
  status: varchar('status', { length: 20 }).default('upcoming'), // 'upcoming', 'completed', 'cancelled'
  notes: text('notes'),
  contactPhone: varchar('contact_phone', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. BẢNG TIN TỨC & CẨM NANG (Articles)
export const articles = pgTable('articles', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary'),
  content: text('content'),
  image: varchar('image', { length: 512 }),
  publishedAt: timestamp('published_at').defaultNow(),
});

// RELATIONS DEFINITION
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
}));

export const expertsRelations = relations(experts, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
  expert: one(experts, {
    fields: [bookings.expertId],
    references: [experts.id],
  }),
}));
