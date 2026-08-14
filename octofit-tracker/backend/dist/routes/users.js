import { Router } from 'express';
import User from '../models/user.js';
const usersRouter = Router();
usersRouter.get('/', async (_req, res) => {
    try {
        const items = await User.find().populate('team', 'name city').sort({ name: 1 }).lean();
        res.json({ resource: 'users', items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
export default usersRouter;
