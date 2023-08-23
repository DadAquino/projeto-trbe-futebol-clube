import TeamStatistics from '../utils/TeamStatistics';
import { ServiceResponse } from '../utils/ServiceResponse';

import SequelizeMatch from '../database/models/Sequelize.Match';
import SequelizeTeam from '../database/models/Sequelize.Team';

import ITeamResultMatches from '../Interfaces/LeaderBoards/ITeamResultMatches';

export default class LeaderboardService {
  private model = SequelizeTeam;

  private static mapStatsReturn = (team: unknown, teamSide?: 'Home' | 'Away') => {
    const {
      name, totalPoints, totalGames, totalVictories, totalDraws,
      totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency,
    } = new TeamStatistics(team as ITeamResultMatches, teamSide);
    return {
      name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  };

  public async home(): Promise<ServiceResponse<Partial<TeamStatistics>[]>> {
    const allTeams = await this.model.findAll({
      include: [
        { model: SequelizeMatch,
          as: 'matchesHome',
          foreignKey: 'homeTeamId',
          where: { inProgress: false } },
        { model: SequelizeMatch,
          as: 'matchesAway',
          foreignKey: 'awayTeamId',
          where: { inProgress: false } },
      ],
    });

    const homeStats = allTeams.map((team) => LeaderboardService.mapStatsReturn(team, 'Home'));
    const finalHomeStats = TeamStatistics.sortMatches(homeStats);

    return {
      status: 200,
      data: finalHomeStats,
    };
  }

  public async away(): Promise<ServiceResponse<Partial<TeamStatistics>[]>> {
    const allTeams = await this.model.findAll({
      include: [
        { model: SequelizeMatch,
          as: 'matchesHome',
          foreignKey: 'homeTeamId',
          where: { inProgress: false } },
        { model: SequelizeMatch,
          as: 'matchesAway',
          foreignKey: 'awayTeamId',
          where: { inProgress: false } },
      ],
    });

    const awayStats = allTeams.map((team) => LeaderboardService.mapStatsReturn(team, 'Away'));
    const finalAwayStats = TeamStatistics.sortMatches(awayStats);

    return {
      status: 200,
      data: finalAwayStats,
    };
  }

  public async leaderboard(): Promise<ServiceResponse<Partial<TeamStatistics>[]>> {
    const allTeams = await this.model.findAll({
      include: [
        { model: SequelizeMatch,
          as: 'matchesHome',
          foreignKey: 'homeTeamId',
          where: { inProgress: false } },
        { model: SequelizeMatch,
          as: 'matchesAway',
          foreignKey: 'awayTeamId',
          where: { inProgress: false } },
      ],
    });

    const allTeamsStats = allTeams.map((team) => LeaderboardService.mapStatsReturn(team));
    const finalAllTeamsStats = TeamStatistics.sortMatches(allTeamsStats);

    return {
      status: 200,
      data: finalAllTeamsStats,
    };
  }
}

// Requirement completed with the help of Allex Thiago Santos Rosa
// https://github.com/AllexThiagoSR
// https://www.linkedin.com/in/allexthiagosantosrosa
