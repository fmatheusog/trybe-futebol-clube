import { Request, Response } from 'express';
import CreateMatchUseCase from './CreateMatchUseCase';

export default class CreateMatchController {
  constructor(
    private createMatchUseCase: CreateMatchUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    } = req.body;

    try {
      const newTeam = await this.createMatchUseCase.execute({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress,
      });

      return res.status(201).json(newTeam);
    } catch (err) {
      return res.status(401).json({
        message: (err as Error).message,
      });
    }
  }
}
