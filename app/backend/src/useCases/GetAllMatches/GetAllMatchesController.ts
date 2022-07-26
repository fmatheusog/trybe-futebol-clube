import { Request, Response } from 'express';

import GetAllMatchesUseCase from './GetAllMatchesUseCase';

export default class GetAllMatchesController {
  constructor(
    private getAllMatchesUseCase: GetAllMatchesUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const matches = await this.getAllMatchesUseCase.execute();

    return res.status(200).json(matches);
  }
}
