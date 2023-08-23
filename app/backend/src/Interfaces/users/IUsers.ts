import { ILogin } from '../login/ILogin';

// IUser pattern
export default interface IUsers extends ILogin{
  id: number,
  username: string,
  role: string,
}

// API User response
export type responseIUsers = Omit<IUsers, 'password'>;
