import { Router } from 'express';
import { authenticateUserController } from '../useCases/AuthenticateUser';
import loginValidation from '../middlewares/loginValidation.middleware';

const AuthenticationRoutes = Router();

AuthenticationRoutes
  .post(
    '/',
    loginValidation,
    (req, res) => authenticateUserController.handle(req, res),
  );
AuthenticationRoutes.get('/validate');

export default AuthenticationRoutes;
