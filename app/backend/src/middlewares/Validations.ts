import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import { IUser } from '../Interfaces/Users/IUser';
import Teams from '../database/models/TeamModel';

// Auxílio do trybeteca
class Validations {
  private static teamModel = Teams;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
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

  // Auxílio do meu mentor Pablo e do meu colega de turma Allex Thiago
  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const user = JWT.verify(token) as IUser;
      res.locals.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async validateTeams(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamOne = await Validations.teamModel.findByPk(homeTeamId);
    const teamTwo = await Validations.teamModel.findByPk(awayTeamId);

    if (!teamOne || !teamTwo) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    return next();
  }
}

export default Validations;
