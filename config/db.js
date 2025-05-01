// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS), // Ensure it's a string
  port: parseInt(process.env.DB_PORT, 10), // Convert to number

});

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  });

module.exports = pool;
