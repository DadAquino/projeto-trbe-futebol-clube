import IMatches from '../matches/IMatches';
import ITeams from '../teams/ITeams';

export default interface ITeamResultMatches extends ITeams {
  matchesHome: IMatches[]
  matchesAway: IMatches[]
}
