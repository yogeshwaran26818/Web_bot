require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../server/config/db'); // path adjusted for api folder

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('../server/routes/authRoutes'));
app.use('/api/links', require('../server/routes/linkRoutes'));
app.use('/api/rag', require('../server/routes/ragRoutes'));

// Debug route to see collections
app.get('/api/debug/collections', async (req, res) => {
  const Link = require('../server/models/Link');
  const User = require('../server/models/User');
  const links = await Link.find();
  const users = await User.find();
  res.json({ links, users });
});

// Create test user
app.post('/api/debug/create-user', async (req, res) => {
  const User = require('../server/models/User');
  const user = new User({
    clerkId: 'test-user',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
  });
  await user.save();
  res.json(user);
});

// ❌ REMOVE app.listen()
// ✅ Instead export the app for Vercel
module.exports = app;
