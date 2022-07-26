import { Router } from 'express';
import { authenticateUserController } from '../useCases/AuthenticateUser';
import { getUserRoleByIdController } from '../useCases/GetUserRoleById';
import loginValidation from '../middlewares/loginValidation.middleware';
import tokenValidation from '../middlewares/tokenValidation.middleware';

const AuthenticationRoutes = Router();

AuthenticationRoutes
  .post(
    '/',
    loginValidation,
    (req, res) => authenticateUserController.handle(req, res),
  );
AuthenticationRoutes
  .get(
    '/validate',
    (req, res, next) => tokenValidation(req, res, next),
    (req, res) => getUserRoleByIdController.handle(req, res),
  );

export default AuthenticationRoutes;
