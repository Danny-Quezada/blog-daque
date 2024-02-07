import type { Article } from "../models/Article";

export interface IArticleModel extends IModel<Article> {
  GetById(Id: string): Promise<Article | null>;
  AuthUser(email: string, password: string): Promise<string>;
}
