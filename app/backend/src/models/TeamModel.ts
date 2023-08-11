import { ITeam } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import SequelizeModel from '../database/models/TeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeModel;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const teamById = await this.model.findByPk(id);

    if (teamById == null) return null;

    const { teamName }: ITeam = teamById;

    return { id, teamName };
  }
}