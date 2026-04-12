// Packages import karo
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Express app banao
const app = express();

// Middleware — har request se pehle chalta hai
app.use(cors());
app.use(express.json());

// Routes Import Karo
const analyzeRoutes = require('./routes/analyzeRoutes');

// Routes Use Karo
app.use('/api', analyzeRoutes);

// Pehla Route — Test ke liye
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodePulse AI Backend chal raha hai! 🚀',
    status: 'success'
  });
});

// Server Start Karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server port ${PORT} pe chal raha hai!`);
});