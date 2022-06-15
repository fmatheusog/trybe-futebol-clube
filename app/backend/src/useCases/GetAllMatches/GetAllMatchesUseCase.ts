import ITeamsRepository from '../../repositories/ITeamsRepository';
import IMatchesRepository from '../../repositories/IMatchesRepository';

export default class GetAllMatchesUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute() {
    const matches = await this.matchesRepository.getAllMatches();

    const response = matches.map(async (match) => {
      const matchInfo = {
        ...match,
        teamHome: {
          teamName: (await this.teamsRepository.findById(match.id)).teamName,
        },
        teamAway: {
          teamName: (await this.teamsRepository.findById(match.id)).teamName,
        },
      };

      return matchInfo;
    });

    return response;
  }
}
