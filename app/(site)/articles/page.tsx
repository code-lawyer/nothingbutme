import FilteredArticleList from "@/components/FilteredArticleList";
import { getAllArticles } from "@/lib/articles";
import { getProfile } from "@/lib/content";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const profile = getProfile();
  return { title: `文章 — ${profile.name}` };
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="pt-14">
      <FilteredArticleList articles={articles} />
    </main>
  );
}
