import SequelizeMatch from '../database/models/Sequelize.Match';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import IMatches from '../Interfaces/matches/IMatches';

import NewEntity from '../Interfaces/NewEntity';

import SequelizeTeam from '../database/models/Sequelize.Team';

export default class MatchModel implements IMatchesModel {
  private matchModel = SequelizeMatch;

  private static includeInProgress(inProgress?: string) {
    return inProgress ? { inProgress: inProgress === 'true' } : {};
  }

  public async findAll(inProgress?: string): Promise<IMatches[]> {
    const allMatches = await this.matchModel.findAll({
      where: { ...MatchModel.includeInProgress(inProgress) },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  public async findById(id: number): Promise<IMatches | null> {
    const match = await this.matchModel.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (match == null) return null;

    return match;
  }

  public async finishMatch(id: IMatches['id']):
  Promise<IMatches | null> {
    const [updateMatch] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    if (updateMatch === 0) return null;

    return this.findById(id);
  }

  public async update(id: IMatches['id'], data: Partial<NewEntity<IMatches>>):
  Promise<IMatches | null> {
    const [updateMatch] = await this.matchModel.update(data, { where: { id } });

    if (updateMatch === 0) return null;

    return this.findById(id);
  }

  public async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const newMatch = await this.matchModel.create(data);
    return newMatch;
  }
}
