import { NextResponse } from "next/server";

import { loadProfiles } from "@/lib/dataLoader";

export async function GET() {
  const users = loadProfiles();

  return NextResponse.json(users);
}