'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.NUMBER
      },
      home_team_goals: {
        type: Sequelize.NUMBER
      },
      away_team: {
        type: Sequelize.NUMBER
      },
      away_team_goals: {
        type: Sequelize.NUMBER
      },
      in_progress: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};