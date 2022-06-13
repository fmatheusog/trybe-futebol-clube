import { Request, Response } from 'express';
import GetAllTeamsUseCase from './GetAllTeamsUseCase';

export default class GetAllTeamsController {
  constructor(
    private getAllTeamsUseCase: GetAllTeamsUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const teams = await this.getAllTeamsUseCase.execute();

    return res.status(200).json(teams);
  }
}
