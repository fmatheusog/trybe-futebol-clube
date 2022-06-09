import IUsersRepository from '../../repositories/IUsersRepository';
import IGetUserRoleByIdDTO from './GetUserRoleByIdDTO';

export default class GetUserRoleByIdUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IGetUserRoleByIdDTO) {
    const user = await this.usersRepository.findById(data.id);

    return user.role;
  }
}
