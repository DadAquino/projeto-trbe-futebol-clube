import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor(
    service: LeaderboardService = new LeaderboardService(),
  ) { this.service = service; }

  public async homeLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.home();

    return res.status(status).json(data);
  }

  public async awayLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.away();

    return res.status(status).json(data);
  }

  public async leaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.leaderboard();

    return res.status(status).json(data);
  }
}
