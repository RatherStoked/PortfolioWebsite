import { NextRequest, NextResponse } from "next/server";
import { getArticles, writeArticles } from "@/lib/getData";
import { Article } from "@/types";

function auth(req: NextRequest) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return req.headers.get("x-admin-key") === secret;
}

export async function GET() {
  return NextResponse.json(getArticles());
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: Omit<Article, "id"> = await req.json();
  const articles = getArticles();
  const id = articles.length ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
  const created = { id, ...body };
  writeArticles([...articles, created]);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated: Article = await req.json();
  writeArticles(getArticles().map((a) => (a.id === updated.id ? updated : a)));
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id }: { id: number } = await req.json();
  writeArticles(getArticles().filter((a) => a.id !== id));
  return NextResponse.json({ ok: true });
}
