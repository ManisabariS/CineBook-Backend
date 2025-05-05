import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Movie title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters'],
  },
  genre: { 
    type: String, 
    required: [true, 'Genre is required'],
    trim: true,
    enum: {
      values: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Other'],
      message: '{VALUE} is not a valid genre',
    },
  },
  releaseDate: { 
    type: Date, 
    required: [true, 'Release date is required'],
    validate: {
      validator: (date) => date <= new Date(),
      message: 'Release date cannot be in the future',
    },
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    minLength: [20, 'Description must be at least 20 characters'],
    maxLength: [1000, 'Description cannot exceed 1000 characters'],
  },
  duration: { 
    type: Number, 
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [300, 'Duration cannot exceed 300 minutes (5 hours)'],
  },
  rating: { 
    type: Number, 
    min: [0, 'Rating cannot be below 0'],
    max: [10, 'Rating cannot exceed 10'],
    default: null, // Explicitly set as optional
  },
  poster: { 
    type: String, 
    trim: true,
    validate: {
      validator: (url) => {
        if (!url) return true; // Optional field
        return /^(https?:\/\/).*\.(jpg|jpeg|png|webp)$/i.test(url);
      },
      message: 'Poster must be a valid image URL (HTTP/HTTPS and .jpg/.png/.webp)',
    },
  },
  showtimes: [
    {
      time: { 
        type: String, 
        required: [true, 'Showtime is required'],
        trim: true,
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format (24-hour)'],
      },
      theater: { 
        type: String, 
        required: [true, 'Theater name is required'],
        trim: true,
        maxLength: [50, 'Theater name cannot exceed 50 characters'],
      },
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true }, // Improves API responses
});

// Indexes for faster queries
movieSchema.index({ title: 'text', genre: 1 }); // Text search on title, filter by genre
movieSchema.index({ releaseDate: -1 }); // Sort by newest releases

// Virtual for formatted release date (does not affect DB)
movieSchema.virtual('formattedReleaseDate').get(function() {
  return this.releaseDate?.toISOString().split('T')[0]; // YYYY-MM-DD
});

// Pre-save hook for data cleanup
movieSchema.pre('save', function(next) {
  if (this.showtimes) {
    this.showtimes = this.showtimes.map(show => ({
      time: show.time.replace(/\s+/g, ''), // Remove spaces (e.g., "14 : 30" → "14:30")
      theater: show.theater.trim(),
    }));
  }
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;