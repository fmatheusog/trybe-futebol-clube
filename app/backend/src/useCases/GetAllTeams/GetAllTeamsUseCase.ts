import ITeamsRepository from '../../repositories/ITeamsRepository';

export default class GetAllTeamsUseCase {
  constructor(
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute() {
    const teams = await this.teamsRepository.getAll();

    return teams;
  }
}
