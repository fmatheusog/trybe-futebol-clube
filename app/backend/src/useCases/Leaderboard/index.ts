import LeaderboardController from './LeaderboardController';
import LeaderboardUseCase from './LeaderboardUseCase';
import MatchesRepository from '../../repositories/implementations/MatchesRepository';
import TeamsRepository from '../../repositories/implementations/TeamsRepository';

const matchesRepository = new MatchesRepository();
const teamsRepository = new TeamsRepository();

const leaderboardUseCase = new LeaderboardUseCase(teamsRepository, matchesRepository);
const leaderboardController = new LeaderboardController(leaderboardUseCase);

export { leaderboardUseCase, leaderboardController };
