import { compare } from 'bcryptjs';
import User from '../database/models/users';
import TokenService from './TokenService';

export default class AuthenticationService {
  private user: User | null;
  private incorrectDataErrorMessage = 'Incorrect email or password';
  private tokenService = new TokenService();

  async login(email: string, password: string): Promise<object | null> {
    this.user = await User.findOne({
      where: { email },
    });

    if (!this.user) throw new Error(this.incorrectDataErrorMessage);

    const isPasswordCorrect = await compare(password, this.user.password);
    if (!isPasswordCorrect) throw new Error(this.incorrectDataErrorMessage);

    const { id } = this.user;
    const token = await this.tokenService.generate(id);

    return {
      user: {
        id,
        username: this.user.username,
        role: this.user.role,
        email: this.user.email,
      },
      token,
    };
  }
}
