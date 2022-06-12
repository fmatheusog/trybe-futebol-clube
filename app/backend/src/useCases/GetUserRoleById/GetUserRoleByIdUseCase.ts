import IUsersRepository from '../../repositories/IUsersRepository';
import IGetUserRoleByIdDTO from './GetUserRoleByIdDTO';

export default class GetUserRoleByIdUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IGetUserRoleByIdDTO) {
    const user = await this.usersRepository.findById(data.id);

    if (!user) throw new Error('User not found');

    return user.role;
  }
}
