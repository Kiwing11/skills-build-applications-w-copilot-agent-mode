import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';
const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const board = await Leaderboard.findOne({ scope: 'global', period: 'weekly' })
            .populate('entries.user', 'name email')
            .populate('entries.team', 'name city')
            .sort({ updatedAt: -1 })
            .lean();
        res.json({ resource: 'leaderboard', rankings: board?.entries ?? [] });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
export default leaderboardRouter;
