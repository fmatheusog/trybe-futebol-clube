import UpdateMatchController from './UpdateMatchController';
import UpdateMatchUseCase from './UpdateMatchUseCase';
import MatchesRepository from '../../repositories/implementations/MatchesRepository';

const matchesRepository = new MatchesRepository();

const updateMatchUseCase = new UpdateMatchUseCase(matchesRepository);

const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export { updateMatchUseCase, updateMatchController };
