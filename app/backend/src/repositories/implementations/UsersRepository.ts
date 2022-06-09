import User from '../../database/models/users';
import IUsersRepository from '../IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private users = User;
  async findByEmail(email: string): Promise<User> {
    const user = await this.users.findOne({ where: { email } });

    return user as User;
  }

  async findById(id: number): Promise<User> {
    const user = await this.users.findOne({ where: { id } });

    return user as User;
  }
}
