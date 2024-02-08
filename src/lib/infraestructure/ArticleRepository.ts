import type { IArticleModel } from "../domain/interfaces/IArticleModel";
import { Article } from "../domain/models/Article";
import { initializeApp, type FirebaseApp } from "firebase/app";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  addDoc,
  setDoc,
  Timestamp
} from "firebase/firestore";
import {
  
  type Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  
} from "firebase/auth";

import { init } from "astro/virtual-modules/prefetch.js";

class ArticleRepository implements IArticleModel {
  async AuthUser(email: string, password: string): Promise<string> {
    try {
      
      if (!this.clientApp) {
        await this.Init();
      }
      console.log(email);
     
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.Create( new Article(
        "333333",
        "test",
       "# Hola",
        new Date(),
        "test",
        "test",
        "test",
      ),user.user.uid);
      return user.user.uid;
    } catch (e) {
      throw new Error("Incorrect information!");
    }
  }

  private static instance: ArticleRepository;
  public static obtenerInstancia(): ArticleRepository {
    if (!ArticleRepository.instance) {
      ArticleRepository.instance = new ArticleRepository();
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
    messagingSenderId: import.meta.env.SNOWPACK_MESSAGING_SENDER_ID,
    appId: import.meta.env.SNOWPACK_PUBLIC_APP_ID,
    measurementId: import.meta.env.SNOWPACK_MEASUREMENT_ID,
  };

  firestore: any;
  clientApp: FirebaseApp | null = null;
  auth: Auth | any;
  Articles: Article[] | undefined = [];
  async Init(): Promise<void> {
    this.clientApp = initializeApp(this.firebaseConfig);
    this.firestore = await getFirestore();
    this.auth = await getAuth(this.clientApp);
    
  }
  async Read(): Promise<Article[]> {
    let Articles: Article[] = [];
    let snapshots = await getDocs(collection(this.firestore, "articles"));
    snapshots.forEach((Element) => {
      const data = Element.data();

      let article: Article = new Article(
        data["Id"],
        data["Title"],
        data["Value"],
        data["PublishAt"].toDate(),
        data["Description"],
        data["Category"],
        data["HexColor"],
      );

      Articles.push(article);
    });
    return Articles;
  }
  async Create(article: Article, uid: string | null): Promise<boolean> {
    if (!this.clientApp) {
      await init();
      
    }
    console.log(uid);
    console.log(article);
    const articlesCollection = collection(this.firestore, "articles");
    // Agregar artículo a la colección
    if (article.Id == "") {
      article.Id = "";
    }

    const newDocRef = await addDoc(articlesCollection, {
      
        "Id": article.Id,
        "Value": article.Value,
        "Description":article.Description,
        "HexColor":article.HexColor,
        "Title": article.Title,
        "Category":article.Category,
        "PublishAt": Timestamp.fromDate(article.PublishAt)
      
      // Asegúrate de incluir el UID del usuario en el artículo si es necesario
    });
    console.log(newDocRef);
    const modify=await setDoc(newDocRef, {
      Value: article.Value,
      Description:article.Description,
      HexColor:article.HexColor,
      Title: article.Title,
      Category:article.Category,
      PublishAt:Timestamp.fromDate(article.PublishAt),
      Id: newDocRef.id,
    });
    
    this.Articles?.push(new Article(newDocRef.id, article.Title, article.Value, article.PublishAt, article.Description, article.Category, article.HexColor));
        return true;
  }
  async Update(arg: Article): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Delete(arg: Article): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
export { ArticleRepository };
