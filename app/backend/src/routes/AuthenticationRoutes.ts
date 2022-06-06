import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

const AuthenticationRoutes = Router();
const authController = new AuthenticationController();

AuthenticationRoutes.get('/validate');
AuthenticationRoutes.post('/', authController.login);

export default AuthenticationRoutes;
