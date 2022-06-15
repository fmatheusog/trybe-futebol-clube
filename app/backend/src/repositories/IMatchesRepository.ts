import Match from '../entities/Match';

export default interface IMatchesRepository {
  getAllMatches(): Promise<Match[]>;
  getAllInProgressMatches(): Promise<Match[]>
  getAllFinishedMatches(): Promise<Match[]>
}
