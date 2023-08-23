import { ServiceResponse } from '../utils/ServiceResponse';

import TeamModel from '../models/team.model';
import ITeams from '../Interfaces/teams/ITeams';

export default class TeamService {
  private model: TeamModel;

  constructor(
    model: TeamModel = new TeamModel(),
  ) { this.model = model; }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.model.findAll();
    return {
      status: 200,
      data: allTeams,
    };
  }

  public async getByIdTeam(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.model.findById(id);

    if (!team) {
      return {
        status: 404,
        data: { message: `Team ${id} not found` },
      };
    }
    return { status: 200, data: team };
  }
}