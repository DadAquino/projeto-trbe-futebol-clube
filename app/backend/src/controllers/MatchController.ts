import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

// Auxílio do meu colega de turma Allex Thiago
export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllmatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.getAllMatches(inProgress as string | undefined);
    return res.status(200).json(serviceResponse.data);
  }

  // Auxílio trybeteca
  public async updateFinishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const serviceResponse = await this.matchService.updateFinishMatch(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const match = req.body;

    const serviceResponse = await this.matchService.updateMatch(Number(id), match);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.createMatch(req.body);

    return res.status(201).json(serviceResponse.data);
  }
}