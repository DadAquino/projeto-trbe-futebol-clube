import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeams from '../../Interfaces/teams/ITeams';

export default {
  async up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      }
    })
  },

  async down (queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  }
};
