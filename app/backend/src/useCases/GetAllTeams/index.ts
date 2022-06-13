import GetAllTeamsController from './GetAllTeamsController';
import GetAllTeamsUseCase from './GetAllTeamsUseCase';
import TeamsRepository from '../../repositories/implementations/TeamsRepository';

const teamsRepository = new TeamsRepository();

const getAllTeamsUseCase = new GetAllTeamsUseCase(teamsRepository); // passar repositório como parâmetro

const getAllTeamsController = new GetAllTeamsController(getAllTeamsUseCase);

export { getAllTeamsUseCase, getAllTeamsController };
