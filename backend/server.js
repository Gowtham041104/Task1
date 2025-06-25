const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

dotenv.config();
connectDb();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://saasmanage.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204 // ✅ Important: respond properly to OPTIONS
}));
app.use(express.json());

// ✅ API routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tenants', tenantRoutes);

// ❗ DO NOT CALL app.listen() — Vercel handles it
module.exports = app;
