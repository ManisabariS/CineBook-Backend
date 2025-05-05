import Theater from '../models/Theater.js'; // Import the Theater model

// Get all theaters
export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find(); // Fetch all theaters from the database
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch theaters', error: error.message });
  }
};

// Add a new theater schedule
export const addTheaterSchedule = async (req, res) => {
  const { name, showtimes, seatPrice } = req.body;

  try {
    const newTheater = new Theater({ name, showtimes, seatPrice });
    const savedTheater = await newTheater.save();
    res.status(201).json(savedTheater);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add theater schedule', error: error.message });
  }
};

// Update a theater schedule
export const updateTheaterSchedule = async (req, res) => {
  const { id } = req.params; // Get the theater ID from the URL
  const { name, showtimes, seatPrice } = req.body; // Get updated data from the request body

  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      id,
      { name, showtimes, seatPrice },
      { new: true } // Return the updated document
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json(updatedTheater);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update theater schedule', error: error.message });
  }
};

// Delete a theater schedule
export const deleteTheaterSchedule = async (req, res) => {
  const { id } = req.params; // Get the theater ID from the URL

  try {
    const deletedTheater = await Theater.findByIdAndDelete(id);

    if (!deletedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json({ message: 'Theater deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete theater schedule', error: error.message });
  }
};