import { Request, Response } from 'express';
import GetUserRoleByIdUseCase from './GetUserRoleByIdUseCase';

export default class GetUserRoleByIdController {
  constructor(
    private getUserRoleByIdUseCase: GetUserRoleByIdUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { auth } = req.body;
      const userRole = await this.getUserRoleByIdUseCase.execute({ id: Number(auth.id) });

      return res.status(200).json(userRole);
    } catch (err) {
      return res.status(404).json({ message: (err as Error).message });
    }
  }
}
