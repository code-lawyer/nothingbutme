// app/articles/page.tsx
import ArticleList from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export const metadata = { title: "文章 — Your Name" };

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="pt-14">
      <ArticleList articles={articles} showAll />
    </main>
  );
}
