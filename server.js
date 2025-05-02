const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const heroSlideRoutes = require('./routes/heroSlides');
const servicesRoutes = require('./routes/services')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

        
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/services', servicesRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
