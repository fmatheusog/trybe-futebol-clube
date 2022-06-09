import BCryptPasswordProvider from '../../providers/implementation/BCryptPasswordProvider';
import TokenService from '../../providers/implementation/JwtTokenProvider';
import IUsersRepository from '../../repositories/IUsersRepository';
import IAuthenticateuserDTO from './AuthenticateUserDTO';

export default class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IAuthenticateuserDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) throw new Error('Incorrect email or password');

    const passwordProvider = new BCryptPasswordProvider(data.password);
    const correctPassword = await passwordProvider.compare(user.password);
    if (!correctPassword) throw new Error('Incorrect email or password');

    const tokenProvider = new TokenService();
    const token = await tokenProvider.generate(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
