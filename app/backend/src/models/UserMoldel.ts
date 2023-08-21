import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeModel from '../database/models/UserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeModel;

  async findAll(): Promise<IUser[]> {
    const users = await this.model.findAll();

    return users.map(({ id, email, password, username, role }) => (
      { id, email, password, username, role }
    ));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const userById = await this.model.findByPk(id);

    if (!userById) return null;

    const { email, password, username, role }: IUser = userById;

    return { id, email, password, username, role };
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;

    return { id, email, password, username, role };
  }
}
