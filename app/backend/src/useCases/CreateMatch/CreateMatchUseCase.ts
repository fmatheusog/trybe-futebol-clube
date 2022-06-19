import IMatchesRepository from '../../repositories/IMatchesRepository';
import CreateMatchDTO from './CreateMatchDTO';

export default class CreateMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: CreateMatchDTO) {
    const { homeTeam, awayTeam } = data;

    if (homeTeam === awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams');
    }

    const newMatch = await this.matchesRepository.createMatch(data);

    return newMatch;
  }
}
