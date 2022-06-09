import GetUserRoleByIdController from './GetUserRoleByIdController';
import GetUserRoleByIdUseCase from './GetUserRoleByIdUseCase';
import UsersRepository from '../../repositories/implementations/UsersRepository';

const usersRepository = new UsersRepository();

const getUserRoleByIdUseCase = new GetUserRoleByIdUseCase(usersRepository);

const getUserRoleByIdController = new GetUserRoleByIdController(getUserRoleByIdUseCase);

export { getUserRoleByIdUseCase, getUserRoleByIdController };
