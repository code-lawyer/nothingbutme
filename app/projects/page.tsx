// app/projects/page.tsx
import ProjectList from "@/components/ProjectList";
import { projects } from "@/data/projects";

export const metadata = { title: "项目 — Your Name" };

export default function ProjectsPage() {
  return (
    <main className="pt-14">
      <ProjectList projects={projects} showAll />
    </main>
  );
}
