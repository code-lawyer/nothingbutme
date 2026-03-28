// lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface ArticleWithContent extends Article {
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(articlesDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      summary: (data.summary as string) ?? "",
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): ArticleWithContent {
  const filepath = path.join(articlesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    summary: (data.summary as string) ?? "",
    content,
  };
}
