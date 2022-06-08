import { compare } from 'bcryptjs';
import TokenService from '../../services/TokenService';
import IUsersRepository from '../../repositories/IUsersRepository';
import IAuthenticateuserDTO from './AuthenticateUserDTO';

export default class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IAuthenticateuserDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) throw new Error('Incorrect email or password');

    const correctPassword = await compare(data.password, user.password);
    if (!correctPassword) throw new Error('Incorrect email or password');

    const tokenService = new TokenService();
    const token = await tokenService.generate(user.id);

    return {
      user,
      token,
    };
  }
}
