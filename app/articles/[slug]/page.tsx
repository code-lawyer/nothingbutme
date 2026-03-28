// app/articles/[slug]/page.tsx
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return { title: article.title };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return (
    <main className="max-w-[680px] mx-auto px-6 pt-28 pb-24">
      <Link
        href="/articles"
        className="text-[13px] text-[#6b7280] hover:text-[#2563eb] transition-colors mb-10 inline-block"
      >
        ← 返回文章列表
      </Link>

      <header className="mb-10">
        <h1 className="text-[28px] font-bold text-[#111111] leading-tight mb-3">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-[13px] text-[#9ca3af]">
          <span className="font-mono">{article.date}</span>
          <span>{article.tags.join(" · ")}</span>
        </div>
      </header>

      <article className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#374151] [&_h1]:text-[#111111] [&_h2]:text-[#111111] [&_code]:font-mono [&_code]:text-[14px] [&_a]:text-[#2563eb]">
        <MDXRemote source={article.content} />
      </article>
    </main>
  );
}
