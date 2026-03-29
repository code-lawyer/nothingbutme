import Link from "next/link";
import type { Project } from "@/lib/projects";

interface Props {
  projects: Project[];
  showAll?: boolean;
}

export default function ProjectList({ projects, showAll = false }: Props) {
  const displayed = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="max-w-[680px] mx-auto px-6 pt-[120px]">
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        项目
      </h2>

      <div className="divide-y divide-[#e5e7eb]">
        {displayed.map((project) => (
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
              aria-label={`在 GitHub 查看 ${project.name}`}
            >
              GitHub ↗
            </Link>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="mt-6">
          <Link
            href="/projects"
            className="text-[13px] text-[#6b7280] hover:text-[#2563eb] transition-colors"
          >
            查看全部 →
          </Link>
        </div>
      )}
    </section>
  );
}
