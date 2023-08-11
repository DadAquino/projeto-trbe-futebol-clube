// import { Op } from 'sequelize';
import { NewEntity } from '../Interfaces';
import { IMatch } from '../Interfaces/Matches/IMatch';
import Teams from '../database/models/TeamModel';
// import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import SequelizeModel from '../database/models/MatchModel';

// Auxílio do meu colega de turma Allex Thiago
export default class MatchModel {
  private model = SequelizeModel;

  async findAll(inProg: string | undefined): Promise<IMatch[]> {
    const matches = await this.findByQuery(inProg);
    return matches.map(({ id, homeTeamId, awayTeamId, homeTeamGoals,
      awayTeamGoals, inProgress, homeTeam, awayTeam }: IMatch) => ({
      id,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
      homeTeam,
      awayTeam,
    }));
  }

  async findByQuery(inProg?: string) {
    let matches: IMatch[];
    if (inProg) {
      matches = await this.model.findAll({
        where: { inProgress: inProg === 'true' },
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    } else {
      matches = await this.model.findAll({
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    }
    return matches;
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const matchId = await this.model.findByPk(id);
    if (matchId === null) return null;

    const { homeTeamId, awayTeamId, homeTeamGoals,
      awayTeamGoals, inProgress }: IMatch = matchId;
    return {
      id,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };
  }

  async update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.model.create(data);

    const { id, homeTeamId, awayTeamId, homeTeamGoals,
      awayTeamGoals, inProgress }: IMatch = newMatch;
    return {
      id,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };
  }
}