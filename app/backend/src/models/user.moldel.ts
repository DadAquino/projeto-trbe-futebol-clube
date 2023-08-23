
import SequelizeUser from '../database/models/Sequelize.User';
import IUsersModel from '../Interfaces/users/IUsersModel';
import IUsers from '../Interfaces/users/IUsers';

import NewEntity from '../Interfaces/NewEntity';

export default class UserModel implements IUsersModel {
  private userModel = SequelizeUser;

  public async findAll(): Promise<IUsers[]> {
    const allUsers = await this.userModel.findAll({ attributes: { exclude: ['password'] } });
    return allUsers;
  }

  public async findById(idToFind: number | string): Promise<IUsers | null> {
    const user = await this.userModel.findByPk(idToFind, { attributes: { exclude: ['password'] } });

    if (!user) return null;

    return user;
  }

  public async create(data: NewEntity<IUsers>): Promise<IUsers> {
    const newUser = await this.userModel.create(data);
    return newUser;
  }

  public async findByEmail(email: IUsers['email']): Promise<IUsers | null> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return null;

    return user;
  }
}
