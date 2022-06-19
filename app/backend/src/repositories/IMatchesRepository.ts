import Match from '../entities/Match';
import CreateMatchDTO from '../useCases/CreateMatch/CreateMatchDTO';
import UpdateMatchDTO from '../useCases/UpdateMatch/UpdateMatchDTO';

export default interface IMatchesRepository {
  getAllMatches(): Promise<Match[]>;
  getAllInProgressMatches(): Promise<Match[]>;
  getAllFinishedMatches(): Promise<Match[]>;
  createMatch(data: CreateMatchDTO): Promise<Match>;
  finishMatch(id: number): Promise<boolean>;
  updateMatch(data: UpdateMatchDTO): Promise<boolean>;
}
