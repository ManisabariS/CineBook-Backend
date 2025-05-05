import express from 'express';
import { createBooking, getBookingsByUser, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route to create a booking
router.post('/', createBooking);

// Route to get bookings by user
router.get('/user/:userId', getBookingsByUser);

// Route to delete a booking
router.delete('/:bookingId', deleteBooking);

export default router;