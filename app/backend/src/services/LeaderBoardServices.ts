import LeaderboardsFunc from '../utils/LeaderBoards.func';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/LeaderBoards/ILeaderBoards';
import TeamModel from '../models/TeamModel';

// Auxílio do meu colega de turma Allex Thiago
export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

  public async leaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.findAll('false');

    const teams = await this.teamModel.findAll();

    const leaderboards = (new LeaderboardsFunc(teams, matches)).tableLeaderboards();

    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async leaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.findAll('false');

    const teams = await this.teamModel.findAll();

    const leaderboards = (new LeaderboardsFunc(teams, matches, 'away')).tableLeaderboards();

    return { status: 'SUCCESSFUL', data: leaderboards };
  }
}
