import * as bcrypt from 'bcryptjs';

import JWTGenerator from '../utils/JWTGenerator';
import { ServiceMessage, ServiceResponse } from '../utils/ServiceResponse';

import { ILogin } from '../Interfaces/login/ILogin';
import { IToken } from '../Interfaces/token/IToken';
import IUsers, { responseIUsers } from '../Interfaces/users/IUsers';
import NewEntity from '../Interfaces/NewEntity';

import UserModel from '../models/user.moldel';

export default class TeamService {
  private model: UserModel;
  private jwtService = JWTGenerator;

  constructor(
    model: UserModel = new UserModel(),
  ) { this.model = model; }

  public async getAllUsers(): Promise<ServiceResponse<IUsers[]>> {
    const allUsers = await this.model.findAll();
    return {
      status: 200,
      data: allUsers,
    };
  }

  public async getByIdUser(id: number | string): Promise<ServiceResponse<IUsers | null>> {
    const user = await this.model.findById(id);

    if (!user) {
      return {
        status: 404,
        data: { message: `User ${id} not found` },
      };
    }
    return { status: 200, data: user };
  }

  public async createUser(user: NewEntity<IUsers>):
  Promise<ServiceResponse<responseIUsers | ServiceMessage>> {
    const userFound = await this.model.findByEmail(user.email);

    if (userFound) {
      return {
        status: 409,
        data: { message: 'User already exists' },
      };
    }

    const userPassword = bcrypt.hashSync(user.password, 10);

    const newUser = await this.model.create({ ...user, password: userPassword });

    const { id, username, role, email } = newUser as IUsers;

    return {
      status: 200,
      data: { id, username, role, email },
    };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.model.findByEmail(data.email);

    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return {
          status: 401,
          data: { message: 'Invalid email or password' },
        };
      }

      const { email, role } = user as IUsers;

      const token = this.jwtService.sign({ email, role });

      return {
        status: 200,
        data: { token },
      };
    }
    return { status: 401, data: { message: 'Invalid email or password' } };
  }
}
