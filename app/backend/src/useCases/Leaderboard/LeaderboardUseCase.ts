import ITeamsRepository from '../../repositories/ITeamsRepository';
import IMatchesRepository from '../../repositories/IMatchesRepository';
import {
  countWinsDrawsLoses,
  countPoints,
  countGoals,
} from '../../util/LeaderboardUtilities';
import Team from '../../entities/Team';

export default class LeaderboardUseCase {
  constructor(
    private teamsRepository: ITeamsRepository,
    private matchesRepository: IMatchesRepository,
  ) {}

  private async calculateLeaderboard(teams: Team[]) {
    return Promise.all(teams.map(async (team) => {
      const teamMatches = await this.matchesRepository.findByTeamId(team.id);

      const matches = countWinsDrawsLoses(team.id, teamMatches);
      const points = countPoints(team.id, teamMatches);
      const goals = countGoals(team.id, teamMatches);

      return {
        name: team.teamName,
        totalPoints: points,
        totalGames: teamMatches.length,
        totalVictories: matches.wins,
        totalDraws: matches.draws,
        totalLosses: matches.loses,
        goalsFavor: goals.scored,
        goalsOwn: goals.own,
        goalsBalance: goals.scored - goals.own,
        efficiency: Number(((points / (teamMatches.length * 3)) * 100).toFixed(2)),
      };
    }));
  }

  async execute() {
    const teams = await this.teamsRepository.getAll();

    const leaderboard = await this.calculateLeaderboard(teams);
    return leaderboard
      .sort((a, b) => {
        if (a.totalPoints === b.totalPoints) {
          if (a.totalVictories === b.totalVictories) {
            if (a.goalsBalance === b.goalsBalance) {
              if (a.goalsFavor === b.goalsFavor) {
                return b.goalsOwn - a.goalsOwn;
              }
              return a.goalsFavor - b.goalsFavor;
            }
            return a.goalsBalance - b.goalsBalance;
          }
          return a.totalVictories - b.totalVictories;
        }
        return a.totalPoints - b.totalPoints;
      }).reverse();
  }
}
