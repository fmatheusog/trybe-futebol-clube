import User from '../entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
}
