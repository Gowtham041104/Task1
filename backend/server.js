const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDb();

// Enable JSON body parsing
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // ✅ Replace with your frontend URL (Netlify)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Test route
app.get("/", (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tenants', tenantRoutes);

// Export app for Vercel or server
module.exports = app;
