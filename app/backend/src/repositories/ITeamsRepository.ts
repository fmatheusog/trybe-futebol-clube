import Team from '../entities/Team';

export default interface ITeamsRepository {
  findById(id: number): Promise<Team>;
  getAll(): Promise<Team[]>;
}
