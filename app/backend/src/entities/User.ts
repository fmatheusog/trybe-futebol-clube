export default class User {
  public readonly id: number;

  public username: string;
  public email: string;
  public role: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, _id?: number) {
    Object.assign(this, props);
  }
}
