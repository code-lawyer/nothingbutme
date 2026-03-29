// lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { notFound } from "next/navigation";

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
}

export interface ArticleWithContent extends Article {
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

function normalizeFrontmatterDate(raw: unknown): string {
  return raw instanceof Date ? raw.toISOString().slice(0, 10) : (raw as string);
}

export function getAllArticles(): Article[] {
  let files: string[];
  try {
    files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(articlesDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title as string,
      date: normalizeFrontmatterDate(data.date),
      category: (data.category as string) ?? "essay",
      tags: (data.tags as string[]) ?? [],
      summary: (data.summary as string) ?? "",
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export const getArticleBySlug = cache(function getArticleBySlug(slug: string): ArticleWithContent {
  const filepath = path.join(articlesDir, `${slug}.mdx`);
  let raw: string;
  try {
    raw = fs.readFileSync(filepath, "utf-8");
  } catch {
    notFound();
  }
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: normalizeFrontmatterDate(data.date),
    category: (data.category as string) ?? "essay",
    tags: (data.tags as string[]) ?? [],
    summary: (data.summary as string) ?? "",
    content,
  };
});
