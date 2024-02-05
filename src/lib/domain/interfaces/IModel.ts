interface IModel<T> {
  Read(): Promise<Array<T>>;
  Create(arg: T): Promise<boolean>;
  Update(arg: T): Promise<boolean>;
  Delete(arg: T): Promise<boolean>;
  Init() : Promise<void>;
}
