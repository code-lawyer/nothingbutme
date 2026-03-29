import fs from "fs";
import path from "path";

export interface Project {
  slug: string;
  name: string;
  description: string;
  url: string;
  category: string;
  featured: boolean;
}

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  let dirs: string[];
  try {
    dirs = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  return dirs.map((slug) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(projectsDir, slug, "index.json"), "utf-8")
    );
    return {
      slug,
      name: data.name as string,
      description: data.description as string,
      url: data.url as string,
      category: (data.category as string) ?? "tool",
      featured: (data.featured as boolean) ?? false,
    };
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
