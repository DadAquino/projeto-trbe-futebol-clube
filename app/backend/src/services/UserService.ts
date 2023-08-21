import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserMoldel';
import { IUser, IUserResponse, ILogin } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
    const allUsers = await this.userModel.findAll();
    const usersReturn = allUsers.map(({ id, email, username, role }) =>
      ({ id, email, username, role }));
    return { status: 'SUCCESSFUL', data: usersReturn };
  }

  public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    const { username, email, role } = user as IUser;

    return { status: 'SUCCESSFUL', data: { id, username, email, role } };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email, role } = user as IUser;
      const token = this.jwtService.sign({ email, role });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
  }
}
