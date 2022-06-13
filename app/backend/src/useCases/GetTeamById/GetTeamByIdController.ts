import { Request, Response } from 'express';
import GetTeamByIdUseCase from './GetTeamByIdUseCase';

export default class GetTeamByIdController {
  constructor(
    private getTeambyIdUseCase: GetTeamByIdUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = Number(id);
    const team = await this.getTeambyIdUseCase.execute({ id: idNumber });

    return res.status(200).json(team);
  }
}
