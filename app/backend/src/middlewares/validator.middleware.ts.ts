import { NextFunction, Request, Response } from 'express';
import JWTGenerator from '../utils/JWTGenerator';

class Validations {
  static userValidator(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    const requiredFieldKeys = [
      'username',
      'role',
      'email',
      'password',
    ];

    const fieldKeyNotGiven = requiredFieldKeys.find((key) => !(key in user));

    if (fieldKeyNotGiven) {
      return res.status(400).json({ message: `${fieldKeyNotGiven} is required` });
    }

    next();
  }

  static loginValidator(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async tokenValidator(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const splitedToken = token.split(' ');
    const onlyToken = splitedToken[splitedToken.length - 1];

    const validToken = JWTGenerator.verify(onlyToken);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    res.locals.user = validToken;

    next();
  }

  static teamValidator(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }
}

export default Validations;
