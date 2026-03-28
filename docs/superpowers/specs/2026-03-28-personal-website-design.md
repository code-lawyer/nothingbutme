# Personal Website Design Spec
**Date:** 2026-03-28
**Project:** nothinbutme — Personal Homepage

---

## Overview

A minimalist, premium personal website for a lawyer who also codes and thinks deeply. The site serves three purposes: personal brand, portfolio (code projects), and blog (writing/thinking). The aesthetic is cold modern — light background, geometric feel, restrained color contrast.

---

## Tech Stack

- **Framework:** Next.js (App Router, SSG for blog posts)
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist (headings + body), JetBrains Mono (code blocks)
- **Deployment:** Vercel

---

## Visual System

| Token | Value |
|---|---|
| Background | `#FAFAFA` |
| Primary text | `#111111` |
| Secondary text | `#6B7280` |
| Accent (links, hover) | `#2563EB` |
| Divider | `#E5E7EB` |
| Content width | `680px` max |
| Section spacing | `120px` vertical |
| Base spacing unit | `8px` |

**Typography:**
- Headings: Geist Sans, weight 600
- Body: Geist Sans, weight 400, line-height 1.8
- Code: JetBrains Mono
- Chinese fallback: `-apple-system` → `PingFang SC`

---

## Page Structure

```
Navbar
Hero
About
Articles
Projects
Contact + Footer
```

---

## Navbar

- Fixed top, height `56px`
- Left: site owner's name (weight 500, acts as logo)
- Right: 4 text links — `文章` `项目` `关于` `联系`
- No border, no background at top; `backdrop-blur` semi-transparent on scroll
- Mobile: hamburger menu

---

## Hero Section

Layout (desktop):
```
┌─────────────────────────────────────────┐
│                                         │
│  "引用的金句"                            │
│   — 来源                                │
│                                         │
│  ┌──────┐  名字（36px, weight 700）      │
│  │ 照片 │  职业标签（灰色, 14px）         │
│  │      │  自我介绍（正文大小, 2-3句）    │
│  └──────┘                               │
│                                         │
└─────────────────────────────────────────┘
```

- **Quote:** italic, `15px`, `#6B7280`, left border `2px solid #E5E7EB`, padding-left `16px`
- **Photo:** left-floated, `100×120px`, `border-radius: 8px`, grayscale or natural color
- **Name:** `36px`, weight 700
- **Role tags:** `14px`, `#6B7280`, below name
- **Self-intro:** body size, line-height 1.8, 2-3 sentences

---

## About Section

Immediately below Hero, acts as an extension of the introduction.

Three paragraphs:
1. Who I am beyond the job title
2. What I care about — the intersection of law, code, and thinking
3. Why this website exists — to record, share, connect

- Pure text, no images or tables
- Optional "currently working on" note in small gray text at the bottom of this section

---

## Articles Section

Header: `文章` (left-aligned, weight 600)

List layout — one article per row:

| Date | Title | Tags |
|---|---|---|
| `2026-03-28` | 标题 | 思考 |

- Date: `#6B7280`, `13px`, monospace
- Title: primary color, hover → `#2563EB`
- Tags: `#9CA3AF`, `12px`
- Entire row hover: subtle `#F9FAFB` background
- Show latest 5 articles on homepage
- Footer link: `查看全部 →` (text link, no button)

---

## Projects Section

Header: `项目` (left-aligned, weight 600)

List layout — one project per row:

```
项目名称        简短描述（英文）        GitHub ↗
```

- Project name: weight 500
- Description: `#6B7280`
- GitHub icon link: appears on row hover
- Show 3-4 featured projects on homepage

---

## Contact + Footer

Simple footer at page bottom:

```
如果你想聊聊，可以通过以下方式找到我

Email   GitHub   Twitter/X   [WeChat optional]

© 2026 [Name]
```

- Icon + text links, horizontal layout
- No contact form — direct links only
- Copyright in small gray text

---

## Responsive Behavior

- Mobile: single column, photo above name+intro in Hero, font sizes scale down
- Tablet: same as desktop but narrower content column
- Breakpoints follow Tailwind defaults (`sm: 640px`, `md: 768px`, `lg: 1024px`)

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage (all sections above) |
| `/articles` | Full article list |
| `/articles/[slug]` | Individual article (MDX) |
| `/projects` | Full project list |

---

## Content Format

- Articles written in MDX, stored in `/content/articles/`
- Projects defined in a static TypeScript file `/data/projects.ts`
- No CMS — file-based content management
