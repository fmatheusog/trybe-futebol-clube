import Match from '../entities/Match';

export const countWinsDrawsLoses = (teamId: number, teamMatches: Match[]) => {
  const wins = teamMatches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
    return acc + 0;
  }, 0);

  const loses = teamMatches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc + 0;
  }, 0);

  const draws = teamMatches.length - wins - loses;

  return { wins, loses, draws };
};

export const countPoints = (teamId: number, teamMatches: Match[]) => {
  const points = teamMatches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc + 0;
  }, 0);

  return points;
};

export const countGoals = (teamId: number, teamMatches: Match[]) => {
  const scored = teamMatches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
    return acc + 0;
  }, 0);

  const own = teamMatches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.awayTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.homeTeamGoals;
    return acc + 0;
  }, 0);

  return { scored, own };
};

export const organizeOrder = () => {

};
