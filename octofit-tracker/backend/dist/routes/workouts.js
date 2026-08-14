import { Router } from 'express';
import Workout from '../models/workout.js';
const workoutsRouter = Router();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const suggestions = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
        res.json({ resource: 'workouts', suggestions });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workout suggestions', error });
    }
});
export default workoutsRouter;
