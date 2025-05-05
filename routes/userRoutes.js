import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser); // POST /api/users/register

// Route to login a user
router.post('/login', loginUser); // POST /api/users/login

// Route to fetch user profile
router.get('/:id', getUserProfile); // GET /api/users/:id

// Route to update user profile
router.put('/:id', updateUserProfile); // PUT /api/users/:id

export default router;