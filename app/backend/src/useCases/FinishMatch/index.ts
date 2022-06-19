import FinishMatchController from './FinishMatchController';
import FinishMatchUseCase from './FinishMatchUseCase';
import MatchesRepository from '../../repositories/implementations/MatchesRepository';

const matchesRepository = new MatchesRepository();

const finishMatchUseCase = new FinishMatchUseCase(matchesRepository);

const finishMatchController = new FinishMatchController(finishMatchUseCase);

export { finishMatchUseCase, finishMatchController };
