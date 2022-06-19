import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default Match;
