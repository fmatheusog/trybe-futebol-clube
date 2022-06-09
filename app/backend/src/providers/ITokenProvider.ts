import { JwtPayload } from 'jsonwebtoken';

export default interface ITokenProvider {
  generate(id: number): Promise<string | JwtPayload>;
  decode(token: string): Promise<string | JwtPayload>;
}
