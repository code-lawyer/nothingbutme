"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryTabs from "./CategoryTabs";
import type { Article } from "@/lib/articles";

const ARTICLE_CATEGORIES = [
  { value: "all", label: "全部" },
  { value: "law", label: "法律思考" },
  { value: "tech", label: "技术" },
  { value: "essay", label: "随笔" },
  { value: "reading", label: "阅读" },
];

interface Props {
  articles: Article[];
}

export default function FilteredArticleList({ articles }: Props) {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? articles : articles.filter((a) => a.category === category);

  return (
    <section className="max-w-[680px] mx-auto px-6 pt-[120px]">
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        文章
      </h2>

      <CategoryTabs tabs={ARTICLE_CATEGORIES} activeCategory={category} onCategoryChange={setCategory} />

      <div className="divide-y divide-[#e5e7eb]">
        {filtered.map((article) => (
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
        {filtered.length === 0 && (
          <p className="py-8 text-[14px] text-[#9ca3af] text-center">暂无此分类的文章</p>
        )}
      </div>
    </section>
  );
}
