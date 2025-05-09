import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUsers from "../../Interfaces/users/IUsers";

export default {
  async up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },

  async down (queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }
};
