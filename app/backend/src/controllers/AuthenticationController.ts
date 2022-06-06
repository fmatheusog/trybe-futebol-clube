import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';

export default class AuthenticationController {
  private authService = new AuthenticationService();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginResponse = await this.authService.login(email, password);

      return res.status(200).json(loginResponse);
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  }
}
