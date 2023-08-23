import NewEntity from './NewEntity';

export interface ReaderICRUDModel<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface CreatorICRUDModel<T> {
  create(data: NewEntity<T>): Promise<T>,
}

export interface UpdateICRUDModel<T> {
  update(id: number, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModel<T>
  extends
  ReaderICRUDModel<T>,
  CreatorICRUDModel<T>,
  UpdateICRUDModel<T>
{ }
