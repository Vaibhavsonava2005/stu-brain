import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Safe lazy initialization - only connects when called, not at import time
let _sql: NeonQueryFunction<false, false> | null = null;

function getSQL(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set. Add it in Vercel/Netlify environment variables.');
    _sql = neon(url);
  }
  return _sql;
}

// sql as a tagged template literal that lazily initializes
const sql: NeonQueryFunction<false, false> = new Proxy(
  ((...args: Parameters<NeonQueryFunction<false, false>>) => getSQL()(...args)) as NeonQueryFunction<false, false>,
  {
    get: (_, prop) => {
      const db = getSQL();
      return (db as unknown as Record<string, unknown>)[prop as string];
    }
  }
);

export default sql;

export async function initDB() {
  const db = getSQL();


  await db`CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL, admin_email VARCHAR(200),
    city VARCHAR(100), state VARCHAR(100), phone VARCHAR(20), logo_url TEXT,
    white_label_name VARCHAR(200), plan VARCHAR(50) DEFAULT 'trial',
    is_active BOOLEAN DEFAULT FALSE, is_locked BOOLEAN DEFAULT TRUE,
    trial_expires DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
    license_expires DATE, max_students INTEGER DEFAULT 50,
    payment_amount NUMERIC(10,2), payment_date DATE, payment_notes TEXT,
    unlocked_at TIMESTAMP, unlocked_by VARCHAR(100), created_at TIMESTAMP DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL, email VARCHAR(200) UNIQUE, student_id VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL, role VARCHAR(20) NOT NULL,
    class_level INTEGER, section VARCHAR(10), phone VARCHAR(20),
    language VARCHAR(10) DEFAULT 'en', total_xp INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0, last_active DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
  )`;

  // Drop old constraint and recreate (handles role updates)
  try { await db.unsafe("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check"); } catch {}
  try { await db.unsafe("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('superadmin','admin','teacher','student'))"); } catch {}

  await db`CREATE TABLE IF NOT EXISTS chapter_progress (
    id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    chapter_id VARCHAR(50) NOT NULL, class_level INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE, xp_earned INTEGER DEFAULT 0,
    quiz_score INTEGER DEFAULT 0, slides_seen INTEGER DEFAULT 0,
    completed_at TIMESTAMP, UNIQUE(user_id, chapter_id)
  )`;

  await db`CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY, teacher_id INTEGER REFERENCES users(id),
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    class_level INTEGER NOT NULL, chapter_id VARCHAR(50), title VARCHAR(200) NOT NULL,
    instructions TEXT, due_date DATE, created_at TIMESTAMP DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS quiz_results (
    id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    chapter_id VARCHAR(50) NOT NULL, score INTEGER NOT NULL,
    total INTEGER NOT NULL, taken_at TIMESTAMP DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    class_level INTEGER NOT NULL,
    cert_id VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, class_level)
  )`;
  
  try { await db.unsafe('ALTER TABLE schools ADD COLUMN IF NOT EXISTS logo_url TEXT'); } catch {}

  // Plan tiers for schools
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS tier VARCHAR(20) DEFAULT 'trial'"); } catch {}
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS trial_start DATE DEFAULT CURRENT_DATE"); } catch {}
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS max_students INTEGER DEFAULT 50"); } catch {}

  // Leaderboard - class-specific XP tracking
  // XP is already in chapter_progress per class_level - leaderboard reads from there

  // Challenges table
  await db`CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    class_level INTEGER,
    xp_reward INTEGER DEFAULT 50,
    due_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS challenge_submissions (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    answer TEXT,
    xp_awarded INTEGER DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(challenge_id, student_id)
  )`;
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS plan_tier VARCHAR(20) DEFAULT 'trial'"); } catch {}
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS trial_start DATE DEFAULT CURRENT_DATE"); } catch {}
  try { await db.unsafe("ALTER TABLE schools ADD COLUMN IF NOT EXISTS max_students INTEGER DEFAULT 50"); } catch {}

  // Challenges table
  await db`CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    class_level INTEGER,
    xp_reward INTEGER DEFAULT 50,
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS challenge_submissions (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    answer TEXT,
    submitted_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(challenge_id, user_id)
  )`;

  // Safe migrations
  const cols = [
    [`schools`, `admin_email VARCHAR(200)`], [`schools`, `state VARCHAR(100)`],
    [`schools`, `phone VARCHAR(20)`], [`schools`, `plan VARCHAR(50) DEFAULT 'trial'`],
    [`schools`, `is_active BOOLEAN DEFAULT FALSE`], [`schools`, `is_locked BOOLEAN DEFAULT TRUE`],
    [`schools`, `trial_expires DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days')`],
    [`schools`, `license_expires DATE`], [`schools`, `max_students INTEGER DEFAULT 50`],
    [`schools`, `payment_amount NUMERIC(10,2)`], [`schools`, `payment_date DATE`],
    [`schools`, `payment_notes TEXT`], [`schools`, `unlocked_at TIMESTAMP`],
    [`schools`, `unlocked_by VARCHAR(100)`], [`users`, `phone VARCHAR(20)`],
    [`schools`, `plan_tier VARCHAR(20) DEFAULT 'trial'`],
    [`schools`, `trial_start DATE DEFAULT CURRENT_DATE`],
    [`challenges`, `edited_at TIMESTAMP`],
  ];
  for (const [tbl, col] of cols) {
    try { await db.unsafe(`ALTER TABLE ${tbl} ADD COLUMN IF NOT EXISTS ${col}`); } catch {}
  }

  // Seed
  await db`INSERT INTO schools (name,code,admin_email,city,state,white_label_name,plan,is_active,is_locked,max_students) VALUES ('Demo School Jaipur','DEMO2025','admin@demo.com','Jaipur','Rajasthan','STU-BRAIN @ Demo School','annual',TRUE,FALSE,999) ON CONFLICT (code) DO NOTHING`;

  const bcrypt = await import('bcryptjs');
  const h = await bcrypt.default.hash('demo123', 10);
  const sh = await bcrypt.default.hash('090991', 10);

  await db`INSERT INTO users (school_id,name,email,student_id,password_hash,role,class_level) SELECT s.id,'Demo Student','student@demo.com','STU2025001',${h},'student',9 FROM schools s WHERE s.code='DEMO2025' ON CONFLICT (email) DO NOTHING`;
  await db`INSERT INTO users (school_id,name,email,student_id,password_hash,role) SELECT s.id,'Demo Teacher','teacher@demo.com','TCH2025001',${h},'teacher' FROM schools s WHERE s.code='DEMO2025' ON CONFLICT (email) DO NOTHING`;
  await db`INSERT INTO users (school_id,name,email,student_id,password_hash,role) SELECT s.id,'Demo Admin','admin@demo.com','ADM2025001',${h},'admin' FROM schools s WHERE s.code='DEMO2025' ON CONFLICT (email) DO NOTHING`;
  // Update or insert superadmin with new credentials
  const adminId = 'vaibhav2005';
  try { await db`UPDATE users SET email=${adminId}, student_id=${adminId}, password_hash=${sh} WHERE role='superadmin'`; } catch {}
  try { await db`INSERT INTO users (name,email,student_id,password_hash,role) VALUES ('Vaibhav Sonava',${adminId},${adminId},${sh},'superadmin') ON CONFLICT (email) DO UPDATE SET password_hash=${sh},student_id=${adminId},role='superadmin'`; } catch {}

  return { success: true, message: '✅ STU-BRAIN DB ready!' };
}
