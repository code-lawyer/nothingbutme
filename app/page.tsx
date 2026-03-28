import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  return (
    <main>
      <Hero />
      <About />
      <ArticleList articles={articles} />
    </main>
  );
}
