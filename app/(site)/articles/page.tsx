import FilteredArticleList from "@/components/FilteredArticleList";
import { getAllArticles } from "@/lib/articles";

export const metadata = { title: "文章 — Your Name" };

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="pt-14">
      <FilteredArticleList articles={articles} />
    </main>
  );
}
