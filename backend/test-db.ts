import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();
//
async function testConnection() {
  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_ADMIN_USER || process.env.SQL_USER,
    password: process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    port: parseInt(process.env.SQL_PORT || '5432'),
  });

  try {
    console.log('Fetching users in PostgreSQL database...');
    const usersRes = await pool.query('SELECT id, email, full_name, role FROM users;');
    console.log('Users in DB:', usersRes.rows);
  } catch (err) {
    console.error('Database query error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
