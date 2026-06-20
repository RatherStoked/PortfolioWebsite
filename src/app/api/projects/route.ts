import { NextRequest, NextResponse } from "next/server";
import { getProjects, writeProjects } from "@/lib/getData";
import { Project } from "@/types";

function auth(req: NextRequest) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return req.headers.get("x-admin-key") === secret;
}

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: Omit<Project, "id"> = await req.json();
  const projects = getProjects();
  const id = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
  const created = { id, ...body };
  writeProjects([...projects, created]);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated: Project = await req.json();
  writeProjects(getProjects().map((p) => (p.id === updated.id ? updated : p)));
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id }: { id: number } = await req.json();
  writeProjects(getProjects().filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { projects }: { projects: Project[] } = await req.json();
  writeProjects(projects);
  return NextResponse.json({ ok: true });
}