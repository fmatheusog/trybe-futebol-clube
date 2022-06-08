export default interface IPasswordProvider {
  compare(userPassword: string): Promise<boolean>;
}
