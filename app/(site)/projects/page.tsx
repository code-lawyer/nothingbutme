import FilteredProjectList from "@/components/FilteredProjectList";
import { getAllProjects } from "@/lib/projects";

export const metadata = { title: "项目 — Your Name" };

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="pt-14">
      <FilteredProjectList projects={projects} />
    </main>
  );
}
