import CreateMatchDTO from '../../useCases/CreateMatch/CreateMatchDTO';
import Match from '../../database/models/matches';
import IMatchesRepository from '../IMatchesRepository';

export default class MatchesRepository implements IMatchesRepository {
  private matches = Match;

  async getAllMatches(): Promise<Match[]> {
    const allMatches = await this.matches.findAll();

    return allMatches as Match[];
  }

  async getAllInProgressMatches(): Promise<Match[]> {
    const allMatches = await this.matches.findAll({ where: { inProgress: true } });

    return allMatches as Match[];
  }

  async getAllFinishedMatches(): Promise<Match[]> {
    const allMatches = await this.matches.findAll({ where: { inProgress: false } });

    return allMatches as Match[];
  }

  async createMatch(data: CreateMatchDTO): Promise<Match> {
    const newTeam = await this.matches.create({ ...data });

    return newTeam;
  }
}
