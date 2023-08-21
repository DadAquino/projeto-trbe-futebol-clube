import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  // Auxílio do meu mentor Pablo e do colega de turma Rapha Mocellin e Allex Thiago
  static verify(token: string): JwtPayload | string {
    const onlyToken = token.split(' ');
    return verify(onlyToken[onlyToken.length - 1], this.secret) as JwtPayload;
  }
}
