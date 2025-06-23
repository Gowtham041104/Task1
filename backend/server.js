const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

dotenv.config();

const app = express();
connectDb();
app.use(express.json());

app.get("/", (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tenants', tenantRoutes);


module.exports = app;
