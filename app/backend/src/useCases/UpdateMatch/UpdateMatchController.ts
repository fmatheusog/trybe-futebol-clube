import { Request, Response } from 'express';
import UpdateMatchUseCase from './UpdateMatchUseCase';

export default class UpdateMatchController {
  constructor(
    private updateMatchUseCase: UpdateMatchUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      await this.updateMatchUseCase.execute({ id: Number(id), homeTeamGoals, awayTeamGoals });

      return res.status(200).json({ message: 'Edited!' });
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  }
}
