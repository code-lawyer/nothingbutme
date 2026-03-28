// components/ArticleList.tsx
import Link from "next/link";
import type { Article } from "@/lib/articles";

interface Props {
  articles: Article[];
  showAll?: boolean;
}

export default function ArticleList({ articles, showAll = false }: Props) {
  const displayed = showAll ? articles : articles.slice(0, 5);

  return (
    <section id="articles" className="max-w-[680px] mx-auto px-6 pt-[120px]">
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        文章
      </h2>

      <div className="divide-y divide-[#e5e7eb]">
        {displayed.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex items-baseline gap-6 py-3 px-2 -mx-2 rounded hover:bg-[#f9fafb] transition-colors"
          >
            <span className="text-[13px] text-[#6b7280] font-mono flex-shrink-0 w-24">
              {article.date}
            </span>
            <span className="flex-1 text-[15px] text-[#111111] group-hover:text-[#2563eb] transition-colors">
              {article.title}
            </span>
            <span className="text-[12px] text-[#9ca3af] flex-shrink-0 hidden sm:block">
              {article.tags.join(" · ")}
            </span>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-6">
          <Link
            href="/articles"
            className="text-[13px] text-[#6b7280] hover:text-[#2563eb] transition-colors"
          >
            查看全部 →
          </Link>
        </div>
      )}
    </section>
  );
}
