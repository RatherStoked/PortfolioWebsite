import { NextRequest, NextResponse } from "next/server";
import { getProfile, writeProfile } from "@/lib/getData";
import { Profile } from "@/types";

function auth(req: NextRequest) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return req.headers.get("x-admin-key") === secret;
}

export async function GET() {
  return NextResponse.json(getProfile());
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated: Profile = await req.json();
  writeProfile(updated);
  return NextResponse.json(updated);
}
