import IUsers from './IUsers';
import { ReaderICRUDModel, CreatorICRUDModel } from '../ICRUDModel';

export default interface IUserModel extends
  ReaderICRUDModel<IUsers>,
  CreatorICRUDModel<IUsers> {
  findByEmail(email: IUsers['email']): Promise<IUsers | null>,
}
