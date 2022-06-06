import { Application } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import AuthenticationController from '../controllers/AuthenticationController';
import loginSchema from '../middlewares/schemas/login.schemas';

class AuthRoutes {
  private authController = new AuthenticationController();
  private userValidation = new UserValidation();

  public routes(app: Application) {
    app.post(
      '/login',
      (req, res, next) => this.userValidation.run(req, res, next, loginSchema),
      (req, res) => this.authController.login(req, res),
    );
  }
}

export default AuthRoutes;
