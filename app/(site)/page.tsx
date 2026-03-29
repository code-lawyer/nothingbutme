import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { getFeaturedProjects } from "@/lib/projects";
import { getProfile, getAbout, getFooter } from "@/lib/content";

export default function Home() {
  const articles = getAllArticles();
  const featuredProjects = getFeaturedProjects();
  const profile = getProfile();
  const about = getAbout();
  const footer = getFooter();

  return (
    <main>
      <Hero profile={profile} />
      <About about={about} />
      <ArticleList articles={articles} />
      <ProjectList projects={featuredProjects} />
      <Footer footer={footer} />
    </main>
  );
}
