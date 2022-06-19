import IMatchesRepository from '../../repositories/IMatchesRepository';
import FinishMatchDTO from './FinishMatchDTO';

export default class FinishMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: FinishMatchDTO) {
    await this.matchesRepository.finishMatch(data.id);
  }
}
