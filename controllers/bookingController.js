import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { user, movie, theater, showtime, seats, totalPrice } = req.body;

  try {
    // Validate required fields
    if (!user || !movie || !theater || !showtime || !seats || !totalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new booking
    const booking = new Booking({ user, movie, theater, showtime, seats, totalPrice });
    const savedBooking = await booking.save();

    // Populate the saved booking with movie and theater details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('movie', 'title') // Populate movie title
      .populate('theater', 'name'); // Populate theater name

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('movie', 'title') // Populate movie title
      .populate('theater', 'name'); // Populate theater name

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

// Add the deleteBooking function
export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};