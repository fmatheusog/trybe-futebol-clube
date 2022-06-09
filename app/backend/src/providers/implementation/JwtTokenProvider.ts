import { readFileSync } from 'fs';
import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import ITokenProvider from '../ITokenProvider';

export default class TokenService implements ITokenProvider {
  private secret: Secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
  private config: SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  async generate(id: number): Promise<string | JwtPayload> {
    return sign({ id }, this.secret, this.config);
  }

  async decode(token: string): Promise<string | JwtPayload> {
    return verify(token, this.secret);
  }
}
