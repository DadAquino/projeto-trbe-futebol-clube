import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderBoardServices';

// Auxílio do meu colega
export default class LeaderboardsController {
  constructor(
    private leaderboardsService = new LeaderboardsService(),
  ) { }

  public async leaderboardHome(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardsService.leaderboardHome();
    return res.status(200).json(serviceResponse.data);
  }

  public async leaderboardAway(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardsService.leaderboardAway();
    return res.status(200).json(serviceResponse.data);
  }
}
