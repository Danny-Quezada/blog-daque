import type { APIRoute } from "astro";
import { ArticleRepository } from "../../lib/infraestructure/ArticleRepository";
import { Article } from "../../lib/domain/models/Article";
let article = ArticleRepository.obtenerInstancia();
export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  const data = await request.formData();
  console.log(data);
  try {
    const uid = cookies.get("uid");
    if (!uid) {
      redirect("/login");
    }
    const { url: requestUrl } = request;
    const articleDoc: Article = new Article(
      "",
      data.get("Title") as string,
      data.get("Value") as string,
      new Date(data.get("PublishAt") as string),
      data.get("Description") as string,
      data.get("Category") as string,
      data.get("HexColor") as string,
    );
    await article.Create(articleDoc, uid?.value!);
    return new Response(JSON.stringify({ message: "true" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ message: error }), { status: 400 });
    console.error(`Error in player api route: ${error as string}`);
    return redirect("/");
  }
};
