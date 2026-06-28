import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';
//
export async function getOrCreateUser(uid: string, email: string, fullName?: string) {
  try {
    // 1. Check if user already exists by UID
    const existingByUid = await db.select().from(users).where(eq(users.uid, uid));
    if (existingByUid.length > 0) {
      return existingByUid[0];
    }

    // 2. Check if user already exists by email (e.g. seeded in the SQL file)
    const existingByEmail = await db.select().from(users).where(eq(users.email, email));
    if (existingByEmail.length > 0) {
      // Update the seeded user with the Firebase UID
      const updated = await db.update(users)
        .set({
          uid,
          fullName: fullName || existingByEmail[0].fullName,
        })
        .where(eq(users.email, email))
        .returning();
      return updated[0];
    }

    // 3. Determine a reasonable default role based on email if it's a new account
    let defaultRole = 'client';
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.startsWith('admin') || lowerEmail.includes('admin')) {
      defaultRole = 'admin';
    } else if (lowerEmail.startsWith('expert') || lowerEmail.includes('expert')) {
      defaultRole = 'expert';
    }

    // 4. Create new user
    const result = await db.insert(users)
      .values({
        uid,
        email,
        fullName: fullName || null,
        role: defaultRole,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error in getOrCreateUser:', error);
    throw new Error('Failed to synchronize user to database.', { cause: error });
  }
}
