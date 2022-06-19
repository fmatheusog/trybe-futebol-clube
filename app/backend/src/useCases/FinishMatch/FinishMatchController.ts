import { Request, Response } from 'express';
import FinishMatchUseCase from './FinishMatchUseCase';

export default class FinishMatchController {
  constructor(
    private finishMatchUseCase: FinishMatchUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    await this.finishMatchUseCase.execute({ id: Number(id) });

    return res.status(200).json({ message: 'Finished' });
  }
}
