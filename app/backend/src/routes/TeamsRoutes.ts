import { Router } from 'express';
import { getAllTeamsController } from '../useCases/GetAllTeams';
import { getTeamByIdController } from '../useCases/GetTeamById';

const TeamsRoutes = Router();

TeamsRoutes
  .get(
    '/',
    (req, res) => getAllTeamsController.handle(req, res),
  );

TeamsRoutes
  .get(
    '/:id',
    (req, res) => getTeamByIdController.handle(req, res),
  );

export default TeamsRoutes;
