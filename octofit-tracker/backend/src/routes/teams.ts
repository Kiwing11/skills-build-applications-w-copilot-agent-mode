import { Router } from 'express';
import Team from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name email')
      .sort({ totalPoints: -1, name: 1 })
      .lean();

    res.json({ resource: 'teams', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
