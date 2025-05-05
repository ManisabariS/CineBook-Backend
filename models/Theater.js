import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  showtimes: { type: [String], required: true },
  seatPrice: { type: Number, required: true },
});

const Theater = mongoose.model('Theater', theaterSchema);

export default Theater;