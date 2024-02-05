import type { IArticle } from "../domain/interfaces/IArticle";
import { Article } from "../domain/models/Article";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
 class ArticleRepository implements IArticle {

  private static instance:ArticleRepository;
  public static obtenerInstancia():ArticleRepository{
    if(!ArticleRepository.instance){
      ArticleRepository.instance=new ArticleRepository;

    }
    return ArticleRepository.instance;
  }


  async GetById(Id: string): Promise<Article | null> {
    if (!this.clientApp) {
      await this.Init();
    }
    let article: Article | undefined;
    const data = (await getDoc(doc(this.firestore, "articles", Id))).data();
    try {
      article = new Article(
        data!["Id"],
        data!["Title"],
        data!["image"],
        data!["Value"],
        data!["PublishAt"].toDate(),
        data!["Description"],
        data!["Category"],
        data!["HexColor"],
        
      );
      return article;
    } catch (e) {
      return null;
    }
  }

  firebaseConfig = {
    apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.SNOWPACK_PUBLIC_AUTH_DOMAIN,
    projectId: import.meta.env.SNOWPACK_PUBLIC_PROJECT_ID,
    storageBucket: import.meta.env.SNOWPACK_PUBLIC_STORAGE_BUCKET,
    appId: import.meta.env.SNOWPACK_PUBLIC_APP_ID,
  };

  firestore: any;
  clientApp: any;
  Articles: Article[]=[];
  async Init(): Promise<void> {
    this.clientApp = initializeApp(this.firebaseConfig);
    this.firestore = await getFirestore();
  }
  async Read(): Promise<Article[]> {
    let Articles: Article[] = [];
    let snapshots = await getDocs(collection(this.firestore, "articles"));
    snapshots.forEach((Element) => {
      const data = Element.data();

      let article: Article = new Article(
        data["Id"],
        data["Title"],
        data["image"],
        data["value"],
        data["PublishAt"].toDate(),
        data["Description"],
        data["Category"],
        data["HexColor"],
      );

      Articles.push(article);
    });
    return Articles;
    
  }
  Create(arg: Article): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async Update(arg: Article): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Delete(arg: Article): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async test(): Promise<any> {
    let Articles: Article[] = [];
    let snapshots = await getDocs(collection(this.firestore, "articles"));
    snapshots.forEach((Element) => {
      const Article = Element.data();
      Articles.push(Article as Article);
    });
    return Articles;
  }
}
export {ArticleRepository}