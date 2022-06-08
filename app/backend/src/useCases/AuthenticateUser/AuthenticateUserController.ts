import { Request, Response } from 'express';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticateUserController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const loginResponse = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(loginResponse);
    } catch (err) {
      return res.status(401).json({
        message: 'errow',
      });
    }
  }
}
