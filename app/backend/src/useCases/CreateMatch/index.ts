import CreateMatchController from './CreateMatchController';
import MatchesRepository from '../../repositories/implementations/MatchesRepository';
import CreateMatchUseCase from './CreateMatchUseCase';

const matchesRepository = new MatchesRepository();

const createMatchUseCase = new CreateMatchUseCase(matchesRepository);

const createMatchController = new CreateMatchController(createMatchUseCase);

export { createMatchUseCase, createMatchController };
