import IMatches from '../Interfaces/matches/IMatches';
import ITeamStatistics from '../Interfaces/LeaderBoards/ITeamStatistics';
import ITeamResultMatches from '../Interfaces/LeaderBoards/ITeamResultMatches';

export default class TeamStatistics implements ITeamStatistics {
  private team: ITeamResultMatches;

  name: string;
  private teamSide?: 'Home' | 'Away';

  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;

  constructor(team: ITeamResultMatches, teamSide?: 'Home' | 'Away') {
    this.name = team.teamName;
    this.teamSide = teamSide;
    this.team = team;
    this.getStats();
  }

  private getTotalGames() {
    if (this.teamSide) {
      this.totalGames = this.team[`matches${this.teamSide}`].length;
    } else {
      // Catch all matches Home and Away
      this.totalGames = this.team.matchesHome.length + this.team.matchesAway.length;
    }
  }

  private getStats() {
    this.getTotalGames();
    this.getGamesStats();

    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getGoalsStats(goalsScored: number, goalsReceived: number) {
    this.goalsFavor += goalsScored;
    this.goalsOwn += goalsReceived;
  }

  private calculateMatch(match: IMatches, teamSide?: 'Home' | 'Away') {
    const rivalTeam = teamSide === 'Home' ? 'away' : 'home';
    const side = teamSide === 'Home' ? 'home' : 'away';

    const teamAGoals = match[`${side}TeamGoals`];
    const teamBGoals = match[`${rivalTeam}TeamGoals`];

    this.getGoalsStats(teamAGoals, teamBGoals);

    if (teamAGoals > teamBGoals) this.totalVictories += 1;

    else if (teamAGoals < teamBGoals) this.totalLosses += 1;

    else this.totalDraws += 1;
  }

  private getGamesStats() {
    if (this.teamSide) {
      this.team[`matches${this.teamSide}`]
        .forEach((match) => this.calculateMatch(match, this.teamSide));
    } else {
      // Catch all matches Home and Away
      this.team.matchesHome
        .forEach((match) => this.calculateMatch(match, 'Home'));
      this.team.matchesAway
        .forEach((match) => this.calculateMatch(match, 'Away'));
    }
  }

  public static sortMatches(matches: ITeamStatistics[]): ITeamStatistics[] {
    return matches.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamB.goalsOwn - teamA.goalsOwn
    ));
  }
}
