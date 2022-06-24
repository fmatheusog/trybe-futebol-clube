import { Request, Response } from 'express';
import LeaderboardUseCase from './LeaderboardUseCase';

export default class LeaderboardController {
  constructor(
    private leaderboardUseCase: LeaderboardUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const leaderboard = await this.leaderboardUseCase.execute();

    return res.status(200).json(leaderboard);
  }
}
