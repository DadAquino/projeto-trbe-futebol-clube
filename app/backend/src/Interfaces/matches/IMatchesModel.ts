import IMatches from './IMatches';
import {
  ReaderICRUDModel,
  CreatorICRUDModel,
  UpdateICRUDModel,
} from '../ICRUDModel';

export default interface IMatchesModel extends
  ReaderICRUDModel<IMatches>,
  CreatorICRUDModel<IMatches>,
  UpdateICRUDModel<IMatches> {}
