import FilteredProjectList from "@/components/FilteredProjectList";
import { getAllProjects } from "@/lib/projects";
import { getProfile } from "@/lib/content";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const profile = getProfile();
  return { title: `项目 — ${profile.name}` };
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="pt-14">
      <FilteredProjectList projects={projects} />
    </main>
  );
}
