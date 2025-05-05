import express from 'express';
import {
  getTheaters,
  addTheaterSchedule,
  updateTheaterSchedule,
  deleteTheaterSchedule,
} from '../controllers/theaterController.js';

const router = express.Router();

// Route to get all theaters
router.get('/', getTheaters); // GET /api/theaters

// Route to add a new theater schedule
router.post('/', addTheaterSchedule); // POST /api/theaters

// Route to update a theater schedule
router.put('/:id', updateTheaterSchedule); // PUT /api/theaters/:id

// Route to delete a theater schedule
router.delete('/:id', deleteTheaterSchedule); // DELETE /api/theaters/:id

export default router;