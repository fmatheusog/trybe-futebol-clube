import { Request, Response, NextFunction } from 'express';
import loginSchema from './schemas/login.schemas';

export default class userValidation {
  private schema = loginSchema;

  public run(req: Request, res: Response, next: NextFunction) {
    const { error } = this.schema.validate(req.body);

    if (error) {
      const { message, type } = error.details[0];
      if (type === 'string.email' || type === 'string.min') {
        return res.status(401).json({ message });
      }
      return res.status(400).json({ message });
    }

    next();
  }
}
