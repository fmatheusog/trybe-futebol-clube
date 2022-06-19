import { Router } from 'express';
// controllers
import { getAllMatchesController } from '../useCases/GetAllMatches';
import { createMatchController } from '../useCases/CreateMatch';
// middlwares
import tokenValidation from '../middlewares/tokenValidation.middleware';
import teamsValidation from '../middlewares/teamsValidation.middleware';

const MatchesRoutes = Router();

MatchesRoutes.get(
  '/',
  (req, res) => getAllMatchesController.handle(req, res),
);

MatchesRoutes.post(
  '/',
  tokenValidation,
  teamsValidation,
  (req, res) => createMatchController.handle(req, res),
);

export default MatchesRoutes;
