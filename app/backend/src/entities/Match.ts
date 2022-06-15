export default class Match {
  public readonly id: number;

  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;

  constructor(props: Omit<Match, 'id'>, _id?: number) {
    Object.assign(this, props);
  }
}
