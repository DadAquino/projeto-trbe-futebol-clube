import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();
    res.status(status).json(data);
  }

  public async getByIdTeam(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.teamService.getByIdTeam(Number(id));

    res.status(status).json(data);
  }
}
