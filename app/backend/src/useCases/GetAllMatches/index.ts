import GetAllMatchesController from './GetAllMatchesController';
import GetAllMatchesUseCase from './GetAllMatchesUseCase';
import MatchesRepository from '../../repositories/implementations/MatchesRepository';
import TeamsRepository from '../../repositories/implementations/TeamsRepository';

const matchesRepository = new MatchesRepository();
const teamsRepository = new TeamsRepository();

const getAllMatchesUseCase = new GetAllMatchesUseCase(matchesRepository, teamsRepository);

const getAllMatchesController = new GetAllMatchesController(getAllMatchesUseCase);

export { getAllMatchesUseCase, getAllMatchesController };
