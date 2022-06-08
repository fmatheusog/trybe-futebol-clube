import AuthenticateUserController from './AuthenticateUserController';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import UsersRepository from '../../repositories/implementations/UsersRepository';

const usersRepository = new UsersRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserUseCase, authenticateUserController };
