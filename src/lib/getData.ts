import fs from "fs";
import path from "path";
import { Project, Article, Profile } from "@/types";

// Next.js 13 app router: __dirname isn't reliable, use this instead
const dataDir = path.join(process.cwd(), "src", "data");

export function getProjects(): Project[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, "projects.json"), "utf-8"));
  } catch (e) {
    console.error("Could not read projects.json", e);
    return [];
  }
}

export function getArticles(): Article[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, "articles.json"), "utf-8"));
  } catch (e) {
    console.error("Could not read articles.json", e);
    return [];
  }
}

export function getProfile(): Profile {
  return JSON.parse(fs.readFileSync(path.join(dataDir, "profile.json"), "utf-8"));
}

export function writeProjects(projects: Project[]): void {
  fs.writeFileSync(path.join(dataDir, "projects.json"), JSON.stringify(projects, null, 2));
}

export function writeArticles(articles: Article[]): void {
  fs.writeFileSync(path.join(dataDir, "articles.json"), JSON.stringify(articles, null, 2));
}

export function writeProfile(profile: Profile): void {
  fs.writeFileSync(path.join(dataDir, "profile.json"), JSON.stringify(profile, null, 2));
}