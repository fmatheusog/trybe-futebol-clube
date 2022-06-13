import GetTeamByIdController from './GetTeamByIdController';
import GetTeamByIdUseCase from './GetTeamByIdUseCase';
import TeamsRepository from '../../repositories/implementations/TeamsRepository';

const teamsRepository = new TeamsRepository();

const getTeamByIdUseCase = new GetTeamByIdUseCase(teamsRepository);

const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

export { getTeamByIdUseCase, getTeamByIdController };
