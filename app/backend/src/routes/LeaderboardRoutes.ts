import { Router } from 'express';
// controllers
import { leaderboardController } from '../useCases/Leaderboard';

const LeaderboardRoutes = Router();

LeaderboardRoutes
  .get(
    '/',
    (req, res) => leaderboardController.handle(req, res),
  );

export default LeaderboardRoutes;
