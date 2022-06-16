import { Router } from 'express';
import { getAllMatchesController } from '../useCases/GetAllMatches';

const MatchesRoutes = Router();

MatchesRoutes.get(
  '/',
  (req, res) => getAllMatchesController.handle(req, res),
);

export default MatchesRoutes;
