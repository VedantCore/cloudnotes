const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (This is the new line!)
app.use('/api/auth', require('./routes/auth'));

// Basic test route
app.get('/', (req, res) => {
  res.send('CloudNotes API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});