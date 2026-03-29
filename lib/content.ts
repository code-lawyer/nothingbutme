import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(filepath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export interface Profile {
  name: string;
  avatar: string | null;
  quote: string;
  identityTags: string;
  intro: string;
}

export interface About {
  paragraphs: string[];
  currentProject: string;
}

export interface FooterData {
  contactText: string;
  links: { label: string; href: string }[];
  copyright: string;
}

const defaults = {
  profile: {
    name: "Your Name",
    avatar: null,
    quote: "",
    identityTags: "",
    intro: "",
  } satisfies Profile,
  about: {
    paragraphs: [],
    currentProject: "",
  } satisfies About,
  footer: {
    contactText: "",
    links: [],
    copyright: "Your Name",
  } satisfies FooterData,
};

export function getProfile(): Profile {
  return readJson<Profile>(path.join(contentDir, "profile.json")) ?? defaults.profile;
}

export function getAbout(): About {
  return readJson<About>(path.join(contentDir, "about.json")) ?? defaults.about;
}

export function getFooter(): FooterData {
  return readJson<FooterData>(path.join(contentDir, "footer.json")) ?? defaults.footer;
}
