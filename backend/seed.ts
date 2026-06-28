import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import { adminAuth } from '../lib/firebase-admin.ts';
//
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

const databaseUsersToSeed = [
  // Admins
  {
    email: 'admin@pawhome.vn',
    fullName: 'Quản Trị Viên (Admin)',
    phone: '0900000000',
    role: 'admin',
    passwordHash: '$2b$10$placeholderAdminHashValue1234567890abcdef'
  },
  // Experts from SQL file
  {
    email: 'minhtuan.expert@pawhome.vn',
    fullName: 'Dr. Minh Tuấn',
    phone: '0934111222',
    role: 'expert',
    passwordHash: '$2b$10$placeholderExpertHashValueMinhTuan123'
  },
  {
    email: 'lanhuong.expert@pawhome.vn',
    fullName: 'Chị Lan Hương',
    phone: '0934222333',
    role: 'expert',
    passwordHash: '$2b$10$placeholderExpertHashValueLanHuong456'
  },
  {
    email: 'quocbao.expert@pawhome.vn',
    fullName: 'Anh Quốc Bảo',
    phone: '0934333444',
    role: 'expert',
    passwordHash: '$2b$10$placeholderExpertHashValueQuocBao789'
  },
  {
    email: 'expert@pawhome.vn',
    fullName: 'Chuyên Gia PawHome (Expert)',
    phone: '0922222222',
    role: 'expert',
    passwordHash: '$2b$10$placeholderExpertHashValueExpertGeneric'
  },
  // Customers from SQL file
  {
    email: 'thuy.nguyen@gmail.com',
    fullName: 'Nguyễn Thị Thúy',
    phone: '0901234567',
    role: 'client',
    passwordHash: '$2b$10$placeholderHashValueAbc123456789xyz'
  },
  {
    email: 'hoang.pham@gmail.com',
    fullName: 'Phạm Văn Hoàng',
    phone: '0912345678',
    role: 'client',
    passwordHash: '$2b$10$placeholderHashValueDef456789012uvw'
  },
  {
    email: 'mai.le@gmail.com',
    fullName: 'Lê Thị Mai',
    phone: '0923456789',
    role: 'client',
    passwordHash: '$2b$10$placeholderHashValueGhi789012345rst'
  },
  {
    email: 'customer@pawhome.vn',
    fullName: 'Khách Hàng Thân Thiết (Customer)',
    phone: '0911111111',
    role: 'client',
    passwordHash: '$2b$10$placeholderHashValueCustomerGeneric'
  }
];

async function runSeed() {
  console.log('Starting seed process...');
  
  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_ADMIN_USER || process.env.SQL_USER, // use admin user for seeding if available
    password: process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    port: parseInt(process.env.SQL_PORT || '5432'),
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
    console.log('Database schema & mock data SQL execution completed!');

    // 3. Seeding / Updating users table in the SQL Database for password-login support
    console.log('Seeding/Updating SQL Database users...');
    for (const u of databaseUsersToSeed) {
      const checkRes = await pool.query('SELECT id, role FROM users WHERE email = $1;', [u.email]);
      if (checkRes.rows.length > 0) {
        await pool.query(
          'UPDATE users SET role = $1, full_name = $2, phone = $3 WHERE email = $4;',
          [u.role, u.fullName, u.phone, u.email]
        );
        console.log(`Updated user table entry: ${u.email} with role: ${u.role}`);
      } else {
        const insertRes = await pool.query(
          `INSERT INTO users (email, password_hash, full_name, phone, role, uid) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
          [u.email, u.passwordHash, u.fullName, u.phone, u.role, `db-uid-${u.email.replace(/[@.]/g, '-')}`]
        );
        console.log(`Created new user table entry: ${u.email} (ID: ${insertRes.rows[0].id}, Role: ${u.role})`);
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeed();

