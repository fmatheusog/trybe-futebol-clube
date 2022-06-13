import ITeamsRepository from '../../repositories/ITeamsRepository';
import IGetTeamByIdDTO from './GetTeamByIdDTO';

export default class GetTeamByIdUseCase {
  constructor(
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute(data: IGetTeamByIdDTO) {
    const { id } = data;
    const team = await this.teamsRepository.findById(id);

    return team;
  }
}
