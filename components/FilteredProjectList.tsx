"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryTabs from "./CategoryTabs";
import type { Project } from "@/lib/projects";

const PROJECT_CATEGORIES = [
  { value: "all", label: "全部" },
  { value: "web", label: "Web 应用" },
  { value: "tool", label: "工具" },
  { value: "opensource", label: "开源" },
  { value: "experiment", label: "实验" },
];

interface Props {
  projects: Project[];
}

export default function FilteredProjectList({ projects }: Props) {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? projects : projects.filter((p) => p.category === category);

  return (
    <section className="max-w-[680px] mx-auto px-6 pt-[120px]">
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        项目
      </h2>

      <CategoryTabs tabs={PROJECT_CATEGORIES} activeCategory={category} onCategoryChange={setCategory} />

      <div className="divide-y divide-[#e5e7eb]">
        {filtered.map((project) => (
          <div
            key={project.slug}
            className="group flex items-center gap-6 py-3 px-2 -mx-2 rounded hover:bg-[#f9fafb] transition-colors"
          >
            <span className="font-medium text-[15px] text-[#111111] flex-shrink-0 w-36 font-mono">
              {project.name}
            </span>
            <span className="flex-1 text-[14px] text-[#6b7280]">
              {project.description}
            </span>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#2563eb] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
              aria-label={`${project.name} on GitHub`}
            >
              GitHub ↗
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-[14px] text-[#9ca3af] text-center">暂无此分类的项目</p>
        )}
      </div>
    </section>
  );
}
