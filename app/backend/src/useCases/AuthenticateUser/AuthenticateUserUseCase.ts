import BCryptPasswordProvider from '../../provider/implementation/BCryptPasswordProvider';
import TokenService from '../../provider/implementation/JwtTokenProvider';
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
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
