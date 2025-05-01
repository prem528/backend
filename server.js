require('dotenv').config();
const express = require ('express');
const cors  = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.send(`Connected to PostgreSQL. Server time: ${result.rows[0].now}`);
    } catch (err) {
      res.status(500).send('Database error');
    }
  });

  // Test route to get data from hero_slides
app.get('/api/hero-slides', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM hero_slides');
      res.json(result.rows); // send rows as JSON response
    } catch (err) {
      console.error('Error fetching hero_slides:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});