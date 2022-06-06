import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import AuthenticationController from '../controllers/AuthenticationController';

const AuthenticationRoutes = Router();
const authController = new AuthenticationController();
const userValidation = new UserValidation();

AuthenticationRoutes.get('/validate');
AuthenticationRoutes.post('/', userValidation.run, authController.login);

export default AuthenticationRoutes;
