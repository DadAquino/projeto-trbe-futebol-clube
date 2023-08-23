import { ServiceMessage, ServiceResponse } from '../utils/ServiceResponse';

import MatchModel from '../models/match.model';
import IMatches from '../Interfaces/matches/IMatches';

import { INewMatch } from '../Interfaces/matches/INewMatch';

export default class MatchService {
  private model: MatchModel;

  constructor(
    model: MatchModel = new MatchModel(),
  ) { this.model = model; }

  public async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.model.findAll(inProgress);
    return {
      status: 200,
      data: allMatches,
    };
  }

  public async getByIdMatch(id: number): Promise<ServiceResponse<IMatches | null>> {
    const match = await this.model.findById(id);

    if (!match) {
      return {
        status: 404,
        data: { message: `Match ${id} not found` },
      };
    }
    return { status: 200, data: match };
  }

  public async finishMatch(id: IMatches['id']): Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.model.finishMatch(id);
    return { status: 200, data: { message: 'Finished' } };
  }

  public async updateMatch(id: IMatches['id'], match: IMatches):
  Promise<ServiceResponse<ServiceMessage>> {
    const foundMatch = await this.model.findById(id);

    if (!foundMatch) {
      return {
        status: 404,
        data: { message: `Match ${id} not found` },
      };
    }

    const updatedMatch = await this.model.update(id, match);

    if (!updatedMatch) {
      return {
        status: 409,
        data: { message: `There are no updates to perform in Match ${id}` },
      };
    }

    return { status: 200, data: { message: 'Match updated' } };
  }

  public async createMatch(newMatch: INewMatch) {
    const foundHomeTeam = await this.model.findById(newMatch.homeTeamId);
    const foundAwayTeam = await this.model.findById(newMatch.awayTeamId);

    if (!foundHomeTeam || !foundAwayTeam) {
      return {
        status: 404,
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatchCreated = await this.model.create({ ...newMatch, inProgress: true });
    return { status: 201, data: newMatchCreated };
  }
}

// Source Reference: Trybe Course
// https://github.com/tryber/sd-028-b-live-lectures/tree/backend/lecture/tarde/10.1
