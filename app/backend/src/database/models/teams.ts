import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: DataTypes.INTEGER,
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default Team;
