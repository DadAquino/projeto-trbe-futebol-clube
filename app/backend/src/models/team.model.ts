import SequelizeTeam from '../database/models/Sequelize.Team';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';
import ITeams from '../Interfaces/teams/ITeams';

export default class TeamModel implements ITeamsModel {
  private teamModel = SequelizeTeam;

  public async findAll(): Promise<ITeams[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async findById(id: number): Promise<ITeams | null> {
    const team = await this.teamModel.findByPk(id);

    if (team == null) return null;

    return team;
  }
}
