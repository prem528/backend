const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const heroSlideRoutes = require('./routes/heroSlides');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/hero-slides', heroSlideRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
