import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare role: string;
  declare password: string;
}

User.init({
  id: DataTypes.INTEGER,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default User;
