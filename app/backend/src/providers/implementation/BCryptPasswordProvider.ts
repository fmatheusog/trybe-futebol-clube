import { compare } from 'bcryptjs';
import IPasswordProvider from '../IPasswordProvider';

export default class BCryptPasswordProvider implements IPasswordProvider {
  constructor(
    private password: string,
  ) {}

  compare(userPassword: string): Promise<boolean> {
    return compare(this.password, userPassword);
  }
}
