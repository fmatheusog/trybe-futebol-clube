import { Request, Response, NextFunction } from 'express';
import TeamsRepository from '../repositories/implementations/TeamsRepository';

const teamsValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teamsRepository = new TeamsRepository();

  const homeExists = await teamsRepository.findById(homeTeam);
  const awayExists = await teamsRepository.findById(awayTeam);

  if (!homeExists || !awayExists) {
    return res.status(401).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};

export default teamsValidation;
