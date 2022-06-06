import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export default class userValidation {
  public run = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message, type } = error.details[0];
      if (type === 'string.email' || type === 'string.min') {
        return res.status(401).json({ message });
      }
      return res.status(400).json({ message });
    }

    next();
  };
}
