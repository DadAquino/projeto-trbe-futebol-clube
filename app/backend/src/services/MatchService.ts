import { NewEntity } from '../Interfaces';
import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/Matches/IMatch';
// import { IMatchModel } from '../Interfaces/Matches/IMatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  // Auxílio do meu colega de turma Allex Thiago
  public async getAllMatches(inProg?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProg);

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  // Auxílio trybeteca
  public async updateFinishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const finishMatch = await this.matchModel.update(id, { inProgress: false });
    if (!finishMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, match: IMatch): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const finishMatch = await this.matchModel.update(id, match);
    if (!finishMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Match Updated finish' } };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.create({ ...match, inProgress: true });

    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
