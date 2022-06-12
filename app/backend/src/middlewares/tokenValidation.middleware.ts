import { Request, Response, NextFunction } from 'express';
import JwtTokenProvider from '../providers/implementation/JwtTokenProvider';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const tokenProvider = new JwtTokenProvider();
    const decoded = await tokenProvider.decode(token);

    req.body.auth = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default tokenValidation;
