import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const execId = url.pathname.split("/").pop(); // Extract the 'exec' from the URL

  if (!execId) {
    return NextResponse.json({ error: "Exec  not provided" }, { status: 400 });
  }

  try {
    const executive = await prisma.executive.findUnique({
      where: { id: execId },
    });

    if (!executive) {
      return NextResponse.json({ error: "Executive not found" }, { status: 404 });
    }

    return NextResponse.json(executive);
  } catch (error) {
    return NextResponse.json({ error: "Executive not found" }, { status: 404 });
  }
}
