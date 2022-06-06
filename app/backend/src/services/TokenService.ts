import { readFileSync } from 'fs';
import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class TokenService {
  private secret: Secret = readFileSync('../jwt.evaluation.key', { encoding: 'utf-8' });
  private config: SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  async generate(id: number) {
    return sign({ id }, this.secret, this.config);
  }

  async decode(token: string) {
    return verify(token, this.secret);
  }
}
