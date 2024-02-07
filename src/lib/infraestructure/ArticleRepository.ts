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
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth } from "firebase-admin/auth";

class ArticleRepository implements IArticleModel {
  async AuthUser(email: string, password: string): Promise<string> {
    try {
      if (!this.clientApp) {
        await this.Init();
      }
      console.log(email);

      const user = await signInWithEmailAndPassword(this.auth, email, password);
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
    messagingSenderId: import.meta.env.SNOWPACK_MESSAGING_SENDER_ID,
    appId: import.meta.env.SNOWPACK_PUBLIC_APP_ID,
    measurementId: import.meta.env.SNOWPACK_MEASUREMENT_ID,
  };

  firestore: any;
  clientApp: FirebaseApp | null = null;
  auth: Auth | any;
  Articles: Article[] | undefined = undefined;
  async Init(): Promise<void> {
    this.clientApp = initializeApp(this.firebaseConfig);
    this.firestore = await getFirestore();

    this.auth = await getAuth();
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
  async Create(arg: Article,uid: string | null): Promise<boolean> {
    const articlesCollection = collection(this.firestore, 'articles');

    // Agregar artículo a la colección
    await addDoc(articlesCollection, {
      ...Article,
      uid: uid, // Asegúrate de incluir el UID del usuario en el artículo si es necesario
    });
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
