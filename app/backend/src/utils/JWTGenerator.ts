import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import IJWTPayload from '../Interfaces/IJWTPayload';

export default class JWTGenerator {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '30d',
  };

  static sign(payload: IJWTPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): IJWTPayload | string {
    try {
      return verify(token, this.secret) as IJWTPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
