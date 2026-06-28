import { pgTable, serial, text, varchar, integer, numeric, timestamp, jsonb, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
//
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
  pets: many(pets),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
}));

export const expertsRelations = relations(experts, ({ many }) => ({
  bookings: many(bookings),
}));

// 6. BẢNG THÚ CƯNG (Pets)
export const pets = pgTable('pets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  petType: varchar('pet_type', { length: 20 }).notNull(), // 'Chó', 'Mèo', 'Thỏ', 'Khác'
  breed: varchar('breed', { length: 100 }),
  ageLabel: varchar('age_label', { length: 50 }),
  weightKg: numeric('weight_kg', { precision: 5, scale: 2 }),
  healthStatus: varchar('health_status', { length: 20 }).default('Sức khỏe tốt'), // 'Sức khỏe tốt', 'Cần chú ý', etc.
  nextVaccinationDate: date('next_vaccination_date'),
  image: varchar('image', { length: 512 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. BẢNG LỊCH NHẮC NHỞ (Pet Reminders)
export const petReminders = pgTable('pet_reminders', {
  id: serial('id').primaryKey(),
  petId: integer('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  reminderType: varchar('reminder_type', { length: 30 }).notNull(), // 'vaccination', 'grooming', 'checkup', 'medication', 'other'
  title: varchar('title', { length: 150 }).notNull(),
  reminderDate: date('reminder_date').notNull(),
  reminderTime: varchar('reminder_time', { length: 10 }),
  isCompleted: integer('is_completed').default(0), // 0 hoặc 1 (để tương thích bit của mssql)
  bookingId: integer('booking_id').references(() => bookings.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const petsRelations = relations(pets, ({ one, many }) => ({
  user: one(users, {
    fields: [pets.userId],
    references: [users.id],
  }),
  reminders: many(petReminders),
}));

export const petRemindersRelations = relations(petReminders, ({ one }) => ({
  pet: one(pets, {
    fields: [petReminders.petId],
    references: [pets.id],
  }),
  booking: one(bookings, {
    fields: [petReminders.bookingId],
    references: [bookings.id],
  }),
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
