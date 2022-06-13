export default class Team {
  public readonly id: number;

  public teamName: string;

  constructor(props: Omit<Team, 'id'>, _id?: number) {
    Object.assign(this, props);
  }
}
