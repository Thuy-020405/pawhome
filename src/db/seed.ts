import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import { adminAuth } from '../lib/firebase-admin.ts';

dotenv.config();

const firebaseUsers = [
  {
    email: 'admin@pawhome.vn',
    password: 'admin123',
    displayName: 'Quản Trị Viên (Admin)',
    phoneNumber: '+84900000000',
  },
  {
    email: 'customer@pawhome.vn',
    password: 'customer123',
    displayName: 'Khách Hàng Thân Thiết (Customer)',
    phoneNumber: '+84911111111',
  },
  {
    email: 'expert@pawhome.vn',
    password: 'expert123',
    displayName: 'Chuyên Gia PawHome (Expert)',
    phoneNumber: '+84922222222',
  }
];

async function runSeed() {
  console.log('Starting seed process...');
  
  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_ADMIN_USER, // use admin user for seeding
    password: process.env.SQL_ADMIN_PASSWORD,
    database: process.env.SQL_DB_NAME,
  });

  try {
    // 1. Sync credentials with Firebase Authentication
    console.log('Checking and seeding users in Firebase Authentication...');
    for (const u of firebaseUsers) {
      try {
        const userRecord = await adminAuth.getUserByEmail(u.email);
        console.log(`User ${u.email} already exists in Firebase Auth (UID: ${userRecord.uid})`);
      } catch (authError: any) {
        if (authError.code === 'auth/user-not-found') {
          const createdUser = await adminAuth.createUser({
            email: u.email,
            password: u.password,
            displayName: u.displayName,
            phoneNumber: u.phoneNumber,
          });
          console.log(`Successfully created user ${u.email} in Firebase Auth (UID: ${createdUser.uid})`);
        } else {
          console.error(`Error checking user ${u.email} in Firebase Auth:`, authError);
        }
      }
    }

    // 2. Execute SQL commands in PostgreSQL Cloud SQL database
    const sqlFilePath = path.join(process.cwd(), 'database', 'pawhome_database.sql');
    console.log(`Reading SQL file from: ${sqlFilePath}`);
    let sqlText = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing seed SQL...');
    await pool.query(sqlText);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeed();

