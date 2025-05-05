import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    showtime: { type: String, required: true },
    seats: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;