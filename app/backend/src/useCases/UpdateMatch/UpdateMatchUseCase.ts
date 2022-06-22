import IMatchesRepository from '../../repositories/IMatchesRepository';
import UpdateMatchDTO from './UpdateMatchDTO';

export default class UpdateMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: UpdateMatchDTO) {
    const match = await this.matchesRepository.findById(data.id);
    if (!match) throw new Error('Match does not exist');
    if (match.inProgress === false) throw new Error('Match already finished');

    await this.matchesRepository.updateMatch(data);
  }
}
