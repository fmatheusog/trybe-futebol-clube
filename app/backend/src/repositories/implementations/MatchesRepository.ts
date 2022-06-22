import CreateMatchDTO from '../../useCases/CreateMatch/CreateMatchDTO';
import UpdateMatchDTO from '../../useCases/UpdateMatch/UpdateMatchDTO';
import Match from '../../database/models/matches';
import IMatchesRepository from '../IMatchesRepository';

export default class MatchesRepository implements IMatchesRepository {
  private matches = Match;

  async findById(id: number): Promise<Match> {
    const match = await this.matches.findOne({ where: { id } });

    return match as Match;
  }

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

  async finishMatch(id: number): Promise<boolean> {
    await this.matches.update({ inProgress: false }, { where: { id } });

    return true;
  }

  async updateMatch(data: UpdateMatchDTO): Promise<boolean> {
    await this.matches.update({
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
    }, { where: { id: data.id } });

    return true;
  }
}
