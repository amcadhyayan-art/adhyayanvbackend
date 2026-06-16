import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import adminRoutes from './routes/adminRoutes';
import publicRoutes from './routes/publicRoutes';
import paymentRoutes from './routes/paymentRoutes';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);
app.use('/api/payment', paymentRoutes);



// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adhyayan2026';
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Adhyayan backend server running on port ${PORT}`);
});
