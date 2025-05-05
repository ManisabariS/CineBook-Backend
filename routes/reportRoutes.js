import express from 'express';
import {
  getBookingTrends,
  getSalesPerformance,
  getUserActivity,
  sendBookingConfirmation, // Import the sendBookingConfirmation function
} from '../controllers/reportController.js';

const router = express.Router();

// Route to get booking trends
router.get('/booking-trends', getBookingTrends);

// Route to get sales performance
router.get('/sales-performance', getSalesPerformance);

// Route to get user activity
router.get('/user-activity', getUserActivity);

// Route to send booking confirmation
router.post('/send-booking-confirmation', sendBookingConfirmation);

export default router;