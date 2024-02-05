import type { Article } from "../models/Article";

export interface IArticle extends IModel<Article>{
    GetById(Id: string):Promise<Article| null>;
}