import { ITeam } from '../Interfaces/Teams/ITeam';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { ILeaderboard } from '../Interfaces/Leaderboards/ILeaderboard';

// Auxílio do meu colega de turma Allex Thiago e o mentor Pablo
export default class LeaderboardsFunc {
  constructor(
    private teams: ITeam[],
    private matches: IMatch[],
    private side: 'home' | 'away' = 'home',
  ) {}

  private calcuteTeamsScore(
    teamToAnalize: ILeaderboard,
    data: IMatch,
  ) {
    const teamRival = this.side === 'home' ? 'away' : 'home';
    const team = { ...teamToAnalize };
    team.goalsFavor += data[`${this.side}TeamGoals`];
    team.goalsOwn += data[`${teamRival}TeamGoals`];
    team.totalVictories += data[`${this.side}TeamGoals`] > data[`${teamRival}TeamGoals`]
      ? 1 : 0;
    team.totalLosses += data[`${this.side}TeamGoals`] < data[`${teamRival}TeamGoals`]
      ? 1 : 0;
    team.totalDraws += data[`${this.side}TeamGoals`] === data[`${teamRival}TeamGoals`]
      ? 1 : 0;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;
    team.totalGames += 1;
    team.totalPoints = team.totalVictories * 3 + team.totalDraws;
    team.efficiency = parseFloat(((team.totalPoints / (3 * team.totalGames)) * 100).toFixed(2));
    return team;
  }

  private score(matches: IMatch[], team: string) {
    const defaultValue: ILeaderboard = {
      name: team,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    const result = matches.reduce((acc: ILeaderboard, cur: IMatch) => {
      if (acc.name === cur[`${this.side}Team`]?.teamName) {
        return this.calcuteTeamsScore(acc, cur);
      }
      return acc;
    }, defaultValue); return result;
  }

  public tableLeaderboards() {
    const leaderboards = this.teams.map((team) =>
      this.score(this.matches, team.teamName));
    return leaderboards;
  }
}