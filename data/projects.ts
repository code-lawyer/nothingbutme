// data/projects.ts
export interface Project {
  name: string;
  description: string;
  url: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "legal-parser",
    description: "Parse and extract structured data from Chinese legal documents using Python",
    url: "https://github.com/yourusername/legal-parser",
    featured: true,
  },
  {
    name: "contract-diff",
    description: "Semantic diff tool for contract versions — highlights meaning changes, not just text",
    url: "https://github.com/yourusername/contract-diff",
    featured: true,
  },
  {
    name: "nothinbutme",
    description: "This website — built with Next.js and Tailwind CSS",
    url: "https://github.com/yourusername/nothinbutme",
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
