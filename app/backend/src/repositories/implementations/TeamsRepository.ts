import Team from '../../database/models/teams';
import ITeamsRepository from '../ITeamsRepository';

export default class TeamsRepository implements ITeamsRepository {
  private teams = Team;

  async findById(id: number): Promise<Team> {
    const team = await this.teams.findOne({ where: { id } });

    return team as Team;
  }

  async getAll(): Promise<Team[]> {
    const allTeams = await this.teams.findAll();

    return allTeams as Team[];
  }
}
