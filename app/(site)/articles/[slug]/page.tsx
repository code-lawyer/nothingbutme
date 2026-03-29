// app/(site)/articles/[slug]/page.tsx
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

      <article
        className={[
          "prose prose-gray max-w-none",
          /* 正文 */
          "text-[16px] leading-[2] text-[#374151]",
          /* 标题 */
          "[&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:text-[#111111] [&_h2]:mt-14 [&_h2]:mb-6",
          "[&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-[#111111]",
          /* 段落间距 */
          "[&_p]:my-5",
          /* 引用块 */
          "[&_blockquote]:border-l-[3px] [&_blockquote]:border-[#d1d5db] [&_blockquote]:pl-5 [&_blockquote]:text-[15px] [&_blockquote]:text-[#6b7280] [&_blockquote]:italic [&_blockquote]:my-8",
          "[&_blockquote_p]:my-2",
          /* 粗体 */
          "[&_strong]:text-[#111111] [&_strong]:font-semibold",
          /* 链接 */
          "[&_a]:text-[#2563eb] [&_a]:no-underline hover:[&_a]:underline",
          /* 代码 */
          "[&_code]:font-mono [&_code]:text-[14px]",
          /* 列表 */
          "[&_li]:my-1",
        ].join(" ")}
      >
        <MDXRemote source={article.content} />
      </article>
    </main>
  );
}
