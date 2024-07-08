// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware'); // Updated import
const errorMiddleware = require('./middlewares/errorMiddleware'); // Updated import

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Log the MongoDB URI to ensure it's loaded correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process with failure
  });

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
