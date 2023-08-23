import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private service: MatchService;

  constructor(
    service: MatchService = new MatchService(),
  ) { this.service = service; }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const { status, data } = await this.service.getAllMatches(inProgress as string | undefined);
    res.status(status).json(data);
  }

  public async getByIdMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.service.getByIdMatch(Number(id));

    res.status(status).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const { status, data } = await this.service.finishMatch(id);

    return res.status(status).json(data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const match = req.body;

    const { status, data } = await this.service.updateMatch(id, match);

    return res.status(status).json(data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.createMatch(req.body);

    return res.status(status).json(data);
  }
}
