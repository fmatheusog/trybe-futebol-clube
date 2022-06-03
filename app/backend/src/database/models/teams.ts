import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  declare teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default Team;
