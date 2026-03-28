# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist, premium personal website with homepage, blog, and projects — using Next.js App Router + Tailwind CSS v4.

**Architecture:** Single Next.js app with App Router; pages are statically generated at build time. Articles are MDX files read from `/content/articles/` via `gray-matter` + `next-mdx-remote/rsc`. Projects are defined in a static TypeScript data file. All UI is composed from focused single-responsibility components.

**Tech Stack:** Next.js 15 (App Router, SSG), Tailwind CSS v4, TypeScript, Geist font, JetBrains Mono, gray-matter, next-mdx-remote

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout: font loading, metadata, Navbar |
| `app/globals.css` | CSS variables (design tokens), Tailwind import, base styles |
| `app/page.tsx` | Homepage: assembles Hero, About, ArticleList, ProjectList, Footer |
| `app/articles/page.tsx` | Full articles listing page |
| `app/articles/[slug]/page.tsx` | Individual article MDX render |
| `app/projects/page.tsx` | Full projects listing page |
| `components/Navbar.tsx` | Fixed top nav with scroll blur + mobile menu |
| `components/Hero.tsx` | Quote + photo + name + intro |
| `components/About.tsx` | Three-paragraph self-description |
| `components/ArticleList.tsx` | Reusable article row list (homepage: 5, full page: all) |
| `components/ProjectList.tsx` | Reusable project row list |
| `components/Footer.tsx` | Contact links + copyright |
| `lib/articles.ts` | Read + parse MDX files from `/content/articles/` |
| `data/projects.ts` | Static typed project data array |
| `content/articles/hello-world.mdx` | Sample article |
| `public/avatar.jpg` | Profile photo (placeholder — user replaces) |
| `next.config.ts` | Next.js config (MDX support) |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |

---

## Task 1: Scaffold the Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Run create-next-app**

```bash
cd "C:/Users/lanzh/Documents/Vibe Coding Works/nothinbutme"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint --import-alias "@/*"
```

When prompted, answer:
- Would you like to use Turbopack? → **No**

- [ ] **Step 2: Install additional dependencies**

```bash
npm install geist gray-matter next-mdx-remote
npm install --save-dev @types/node
```

- [ ] **Step 3: Install Tailwind v4 properly**

`create-next-app` may install Tailwind v3. Upgrade to v4:

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

- [ ] **Step 4: Replace postcss.config.mjs**

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000` with no errors.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js project with Tailwind v4"
```

---

## Task 2: Design Tokens & Global Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css with design tokens and base styles**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-background: #fafafa;
  --color-text-primary: #111111;
  --color-text-secondary: #6b7280;
  --color-accent: #2563eb;
  --color-divider: #e5e7eb;
  --color-hover-bg: #f9fafb;

  --font-sans: "Geist", ui-sans-serif, -apple-system, "PingFang SC", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Geist Mono", ui-monospace, monospace;
}

html {
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

body {
  font-family: var(--font-sans);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}
```

- [ ] **Step 2: Update app/layout.tsx to load Geist font**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name",
  description: "Lawyer. Thinker. Builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify styles load**

```bash
npm run dev
```

Open `http://localhost:3000`. Background should be near-white `#FAFAFA`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add design tokens and Geist font"
```

---

## Task 3: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```tsx
// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#articles", label: "文章" },
  { href: "/#projects", label: "项目" },
  { href: "/#about", label: "关于" },
  { href: "/#contact", label: "联系" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-200 ${
        scrolled
          ? "bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e7eb]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[680px] mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-[#111111] font-medium text-sm tracking-tight hover:text-[#2563eb] transition-colors"
        >
          Your Name
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b7280] hover:text-[#111111] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-[#6b7280] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#fafafa]/95 backdrop-blur-md border-b border-[#e5e7eb] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b7280] hover:text-[#111111] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Add Navbar to layout.tsx**

Replace the body in `app/layout.tsx`:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name",
  description: "Lawyer. Thinker. Builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify navbar renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see navbar with name + links. Scroll down: navbar gets blur background. On mobile width: hamburger appears.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/layout.tsx
git commit -m "feat: add Navbar with scroll blur and mobile menu"
```

---

## Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Create: `public/avatar.jpg` (placeholder — user replaces with real photo)

- [ ] **Step 1: Add a placeholder avatar**

Download or copy any small image to `public/avatar.jpg`. This is a placeholder the user will replace. You can use any JPG image temporarily.

- [ ] **Step 2: Create Hero.tsx**

```tsx
// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[680px] mx-auto px-6 pt-32 pb-0">
      {/* Quote */}
      <blockquote className="mb-10 border-l-2 border-[#e5e7eb] pl-4 italic text-[15px] text-[#6b7280] leading-relaxed">
        "法律是将道德最低限度固化为规则的艺术；代码是将逻辑最严格固化为指令的艺术。"
        <footer className="mt-1 not-italic text-[13px]">— Your Name</footer>
      </blockquote>

      {/* Name + photo row */}
      <div className="flex items-start gap-5">
        <Image
          src="/avatar.jpg"
          alt="Profile photo"
          width={100}
          height={120}
          className="rounded-lg object-cover flex-shrink-0 grayscale"
          priority
        />
        <div>
          <h1 className="text-[36px] font-bold text-[#111111] leading-tight tracking-tight">
            Your Name
          </h1>
          <p className="text-[14px] text-[#6b7280] mt-1 mb-3">
            律师 · 写作者 · 业余程序员
          </p>
          <p className="text-[15px] text-[#374151] leading-[1.8]">
            我在法律文书与代码之间游走，试图用精确的语言描述模糊的世界。这里记录我的思考、项目与阅读。
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add Hero to homepage**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify Hero renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see quote, photo, name, role tags, and intro text. On mobile (< 640px): content should stack vertically.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/page.tsx public/avatar.jpg
git commit -m "feat: add Hero section"
```

---

## Task 5: About Section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
// components/About.tsx
export default function About() {
  return (
    <section
      id="about"
      className="max-w-[680px] mx-auto px-6 pt-[120px]"
    >
      <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
        关于
      </h2>

      <div className="space-y-5 text-[15px] text-[#374151] leading-[1.8]">
        <p>
          白天是律师，晚上写代码。这不是什么特别的身份，只是我碰巧在两件事上花了足够多的时间。法律让我习惯于在模糊中寻找确定性，代码让我习惯于在规则中寻找自由。
        </p>
        <p>
          我相信清晰的思维比聪明的头脑更重要。我喜欢把复杂的问题拆解成可以被语言描述的最小单元——无论那个语言是中文、英文还是 Python。
        </p>
        <p>
          这个网站是我的外脑。我在这里记录读到的、想到的、做过的。如果你也在法律、技术或写作的某个交叉点上，也许我们可以聊聊。
        </p>
      </div>

      <p className="mt-8 text-[13px] text-[#9ca3af]">
        目前在做：{" "}
        <span className="text-[#6b7280]">某个合同解析的小工具</span>
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Add About to homepage**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Verify section renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll past Hero — About section should appear with proper spacing.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section"
```

---

## Task 6: Article Data Layer

**Files:**
- Create: `lib/articles.ts`
- Create: `content/articles/hello-world.mdx`
- Create: `content/articles/law-and-code.mdx`

- [ ] **Step 1: Create sample article files**

```mdx
---
title: 你好，世界
date: 2026-03-28
tags: [思考]
summary: 这是第一篇文章，关于为什么我要写这个网站。
---

# 你好，世界

这个网站终于上线了。

我决定开始写作，不是因为我有什么特别重要的事情要说，而是因为写作是我整理思维最有效的方式。

把一个想法写出来，和把它留在脑子里，完全是两回事。
```

Save to `content/articles/hello-world.mdx`.

```mdx
---
title: 为什么律师应该学会写代码
date: 2026-01-15
tags: [法律, 思考]
summary: 代码不是魔法，它只是另一种语言——一种描述规则的语言。
---

# 为什么律师应该学会写代码

合同本质上是一个程序。它定义了输入（触发条件）、处理逻辑（义务与权利）和输出（法律后果）。

当我第一次看到 if-else 语句时，我意识到这和合同条款的结构几乎完全一样。
```

Save to `content/articles/law-and-code.mdx`.

- [ ] **Step 2: Create lib/articles.ts**

```ts
// lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface ArticleWithContent extends Article {
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(articlesDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      summary: (data.summary as string) ?? "",
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): ArticleWithContent {
  const filepath = path.join(articlesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    summary: (data.summary as string) ?? "",
    content,
  };
}
```

- [ ] **Step 3: Verify the data layer works**

Create a quick test file, run it, then delete it:

```bash
node -e "
const path = require('path');
// Quick smoke test: just verify gray-matter parses our files
const matter = require('gray-matter');
const fs = require('fs');
const file = fs.readFileSync('content/articles/hello-world.mdx', 'utf-8');
const { data } = matter(file);
console.log('title:', data.title);
console.log('date:', data.date);
console.log('OK');
"
```

Expected output:
```
title: 你好，世界
date: 2026-03-28
OK
```

- [ ] **Step 4: Commit**

```bash
git add lib/articles.ts content/
git commit -m "feat: add article data layer and sample MDX files"
```

---

## Task 7: ArticleList Component

**Files:**
- Create: `components/ArticleList.tsx`

- [ ] **Step 1: Create ArticleList.tsx**

```tsx
// components/ArticleList.tsx
import Link from "next/link";
import type { Article } from "@/lib/articles";

interface Props {
  articles: Article[];
  showAll?: boolean;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
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
              {formatDate(article.date)}
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
```

- [ ] **Step 2: Add ArticleList to homepage**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  return (
    <main>
      <Hero />
      <About />
      <ArticleList articles={articles} />
    </main>
  );
}
```

- [ ] **Step 3: Verify article list renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll down — should see article list with dates, titles, and tags. Hover rows: background changes, title turns blue.

- [ ] **Step 4: Commit**

```bash
git add components/ArticleList.tsx app/page.tsx
git commit -m "feat: add ArticleList component and wire to homepage"
```

---

## Task 8: Project Data + ProjectList Component

**Files:**
- Create: `data/projects.ts`
- Create: `components/ProjectList.tsx`

- [ ] **Step 1: Create data/projects.ts**

```ts
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
```

- [ ] **Step 2: Create ProjectList.tsx**

```tsx
// components/ProjectList.tsx
import Link from "next/link";
import type { Project } from "@/data/projects";

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
            key={project.name}
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
              className="text-[13px] text-[#9ca3af] hover:text-[#2563eb] transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              aria-label={`${project.name} on GitHub`}
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
```

- [ ] **Step 3: Add ProjectList to homepage**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import ProjectList from "@/components/ProjectList";
import { getAllArticles } from "@/lib/articles";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const articles = getAllArticles();
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <Hero />
      <About />
      <ArticleList articles={articles} />
      <ProjectList projects={featuredProjects} />
    </main>
  );
}
```

- [ ] **Step 4: Verify project list renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll to projects section: project names, descriptions visible. Hover row: GitHub link fades in.

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts components/ProjectList.tsx app/page.tsx
git commit -m "feat: add project data and ProjectList component"
```

---

## Task 9: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
// components/Footer.tsx
import Link from "next/link";

const contactLinks = [
  { label: "Email", href: "mailto:you@example.com" },
  { label: "GitHub", href: "https://github.com/yourusername" },
  { label: "Twitter / X", href: "https://x.com/yourusername" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="max-w-[680px] mx-auto px-6 pt-[120px] pb-16"
    >
      <div className="border-t border-[#e5e7eb] pt-10">
        <p className="text-[14px] text-[#6b7280] mb-6">
          如果你想聊聊，可以通过以下方式找到我
        </p>

        <div className="flex flex-wrap gap-6">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-[14px] text-[#6b7280] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[12px] text-[#9ca3af]">
          © {new Date().getFullYear()} Your Name
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to homepage**

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import ArticleList from "@/components/ArticleList";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const articles = getAllArticles();
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <Hero />
      <About />
      <ArticleList articles={articles} />
      <ProjectList projects={featuredProjects} />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify footer renders**

```bash
npm run dev
```

Full homepage should now be complete end-to-end. Scroll to bottom: contact links + copyright visible.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer with contact links"
```

---

## Task 10: Article Detail Page

**Files:**
- Create: `app/articles/[slug]/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Update next.config.ts for MDX**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
```

- [ ] **Step 2: Create the article detail page**

```tsx
// app/articles/[slug]/page.tsx
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

      <article className="prose prose-gray max-w-none text-[15px] leading-[1.8] text-[#374151] [&_h1]:text-[#111111] [&_h2]:text-[#111111] [&_code]:font-mono [&_code]:text-[14px] [&_a]:text-[#2563eb]">
        <MDXRemote source={article.content} />
      </article>
    </main>
  );
}
```

- [ ] **Step 3: Verify article page works**

```bash
npm run dev
```

Navigate to `http://localhost:3000/articles/hello-world`. Should render the article with title, date, tags, and content.

- [ ] **Step 4: Commit**

```bash
git add app/articles/ next.config.ts
git commit -m "feat: add article detail page with MDX rendering"
```

---

## Task 11: Full Article List Page

**Files:**
- Create: `app/articles/page.tsx`

- [ ] **Step 1: Create app/articles/page.tsx**

```tsx
// app/articles/page.tsx
import ArticleList from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export const metadata = { title: "文章 — Your Name" };

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="pt-14">
      <ArticleList articles={articles} showAll />
    </main>
  );
}
```

- [ ] **Step 2: Verify full articles page**

```bash
npm run dev
```

Navigate to `http://localhost:3000/articles`. Should show all articles (both sample articles). No "查看全部 →" link at bottom.

- [ ] **Step 3: Commit**

```bash
git add app/articles/page.tsx
git commit -m "feat: add full articles listing page"
```

---

## Task 12: Full Projects Page

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create app/projects/page.tsx**

```tsx
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
```

- [ ] **Step 2: Verify projects page**

```bash
npm run dev
```

Navigate to `http://localhost:3000/projects`. Should show all projects without the "查看全部 →" link.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: add full projects listing page"
```

---

## Task 13: Responsive Polish & Production Build

**Files:**
- Modify: `components/Hero.tsx` (mobile stacking)
- Modify: `app/layout.tsx` (metadata)

- [ ] **Step 1: Fix Hero mobile layout**

Replace Hero.tsx photo+name row with responsive stacking:

```tsx
// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[680px] mx-auto px-6 pt-32 pb-0">
      {/* Quote */}
      <blockquote className="mb-10 border-l-2 border-[#e5e7eb] pl-4 italic text-[15px] text-[#6b7280] leading-relaxed">
        "法律是将道德最低限度固化为规则的艺术；代码是将逻辑最严格固化为指令的艺术。"
        <footer className="mt-1 not-italic text-[13px]">— Your Name</footer>
      </blockquote>

      {/* Name + photo row — stacks on mobile */}
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <Image
          src="/avatar.jpg"
          alt="Profile photo"
          width={100}
          height={120}
          className="rounded-lg object-cover flex-shrink-0 grayscale"
          priority
        />
        <div>
          <h1 className="text-[32px] sm:text-[36px] font-bold text-[#111111] leading-tight tracking-tight">
            Your Name
          </h1>
          <p className="text-[14px] text-[#6b7280] mt-1 mb-3">
            律师 · 写作者 · 业余程序员
          </p>
          <p className="text-[15px] text-[#374151] leading-[1.8]">
            我在法律文书与代码之间游走，试图用精确的语言描述模糊的世界。这里记录我的思考、项目与阅读。
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. Output shows static pages generated for `/`, `/articles`, `/articles/hello-world`, `/articles/law-and-code`, `/projects`.

- [ ] **Step 3: Verify production build locally**

```bash
npm run start
```

Open `http://localhost:3000`. Test: homepage, article list, article detail, projects page, mobile responsive layout.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: responsive polish, production build verified"
```

---

## Customization Checklist (User Actions Required)

After implementation, the user should update these placeholders:

- [ ] Replace `public/avatar.jpg` with real profile photo
- [ ] Update name in `components/Navbar.tsx`, `components/Hero.tsx`, `components/Footer.tsx`, `app/layout.tsx`
- [ ] Update quote and source in `components/Hero.tsx`
- [ ] Update role tags in `components/Hero.tsx`
- [ ] Update self-intro paragraph in `components/Hero.tsx`
- [ ] Update About section content in `components/About.tsx`
- [ ] Update "currently working on" in `components/About.tsx`
- [ ] Update contact links in `components/Footer.tsx`
- [ ] Update GitHub URLs in `data/projects.ts`
- [ ] Replace sample MDX files in `content/articles/` with real articles
- [ ] Deploy to Vercel: `npx vercel --prod`
