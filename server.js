import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import theaterRoutes from './routes/theaterRoutes.js';
import reportRoutes from './routes/reportRoutes.js'; // Import report routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/reports', reportRoutes); // Add report routes

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));