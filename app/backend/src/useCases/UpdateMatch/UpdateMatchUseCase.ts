import IMatchesRepository from '../../repositories/IMatchesRepository';
import UpdateMatchDTO from './UpdateMatchDTO';

export default class UpdateMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: UpdateMatchDTO) {
    await this.matchesRepository.updateMatch(data);
  }
}
