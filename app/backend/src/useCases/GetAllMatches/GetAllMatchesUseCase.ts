import ITeamsRepository from '../../repositories/ITeamsRepository';
import IMatchesRepository from '../../repositories/IMatchesRepository';

export default class GetAllMatchesUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute() {
    const matches = await this.matchesRepository.getAllMatches();

    return Promise.all(matches.map(async (match) => {
      const homeTeam = await this.teamsRepository.findById(match.homeTeam);
      const awayTeam = await this.teamsRepository.findById(match.awayTeam);

      return {
        id: match.id,
        homeTeam: match.homeTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeam: match.awayTeam,
        awayTeamGoals: match.awayTeamGoals,
        inProgress: match.inProgress,
        teamHome: { teamName: homeTeam.teamName },
        teamAway: { teamName: awayTeam.teamName },
      };
    }));
  }
}
