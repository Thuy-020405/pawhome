import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();
//
async function seedPetsAndReminders() {
  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_ADMIN_USER || process.env.SQL_USER,
    password: process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    port: parseInt(process.env.SQL_PORT || '5432'),
  });

  try {
    console.log('Seeding pets and pet reminders from SQL data structure...');

    // 1. Find user id for 'thuy.nguyen@gmail.com'
    const userRes = await pool.query("SELECT id FROM users WHERE email = 'thuy.nguyen@gmail.com';");
    let userId = null;
    if (userRes.rows.length > 0) {
      userId = userRes.rows[0].id;
      console.log(`Found user thuy.nguyen@gmail.com with ID: ${userId}`);
    } else {
      // Create user if not exists
      const insertUserRes = await pool.query(`
        INSERT INTO users (email, password_hash, full_name, phone, role)
        VALUES ('thuy.nguyen@gmail.com', '$2b$10$placeholderHashValueAbc123456789xyz', N'Nguyễn Thị Thúy', '0901234567', 'client')
        RETURNING id;
      `);
      userId = insertUserRes.rows[0].id;
      console.log(`Created user thuy.nguyen@gmail.com with ID: ${userId}`);
    }

    // 2. Clear existing pets & reminders for a clean seed
    await pool.query('DELETE FROM pet_reminders;');
    await pool.query('DELETE FROM pets;');

    // 3. Insert Pets
    console.log('Inserting pets Mochi & LuLu...');
    
    // Mochi
    const mochiRes = await pool.query(`
      INSERT INTO pets (user_id, name, pet_type, breed, age_label, weight_kg, health_status, next_vaccination_date, image, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `, [
      userId,
      'Mochi',
      'Chó',
      'Corgi',
      '2 tuổi',
      '12.50',
      'Sức khỏe tốt',
      '2026-10-15',
      'https://lh3.googleusercontent.com/aida-public/mochi.png',
      'Bé khá nhạy cảm với tiếng máy sấy, vui lòng nhẹ tay.'
    ]);
    const mochiId = mochiRes.rows[0].id;
    console.log(`Inserted Mochi with ID: ${mochiId}`);

    // LuLu
    const luluRes = await pool.query(`
      INSERT INTO pets (user_id, name, pet_type, breed, age_label, weight_kg, health_status, next_vaccination_date, image, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `, [
      userId,
      'LuLu',
      'Mèo',
      'Mèo Anh lông ngắn',
      '3 tuổi',
      '4.20',
      'Đến lịch tiêm',
      '2026-06-24',
      'https://lh3.googleusercontent.com/aida-public/lulu.png',
      null
    ]);
    const luluId = luluRes.rows[0].id;
    console.log(`Inserted LuLu with ID: ${luluId}`);

    // 4. Insert Reminders
    console.log('Inserting pet reminders...');
    
    // LuLu reminder (Tiêm phòng dại)
    await pool.query(`
      INSERT INTO pet_reminders (pet_id, reminder_type, title, reminder_date, reminder_time, is_completed)
      VALUES ($1, $2, $3, $4, $5, $6);
    `, [luluId, 'vaccination', 'Tiêm phòng dại', '2026-08-25', '10:30', 0]);

    // Mochi reminder (Cắt tỉa lông)
    await pool.query(`
      INSERT INTO pet_reminders (pet_id, reminder_type, title, reminder_date, reminder_time, is_completed)
      VALUES ($1, $2, $3, $4, $5, $6);
    `, [mochiId, 'grooming', 'Cắt tỉa lông', '2026-08-28', '14:00', 0]);

    console.log('Pets and reminders seeded successfully!');
  } catch (err) {
    console.error('Error seeding pets:', err);
  } finally {
    await pool.end();
  }
}

seedPetsAndReminders();
