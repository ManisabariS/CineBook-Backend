import User from '../models/User.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Include role in the request body

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, role }); // Save role along with other fields
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch user profile
export const getUserProfile = async (req, res) => {
  const { id } = req.params; // User ID from the URL

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.params; // User ID from the URL
  const { name, email, preferences } = req.body; // Updated data from the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, preferences },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user profile', error: error.message });
  }
};