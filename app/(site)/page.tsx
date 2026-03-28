import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const articles = getAllArticles();
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <Hero />
      <About />
      <ArticleList articles={articles} />
      <ProjectList projects={featuredProjects} />
      <Footer />
    </main>
  );
}
