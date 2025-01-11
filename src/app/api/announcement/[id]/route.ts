import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const announcementId = url.pathname.split("/").pop(); // Extract the 'exec' from the URL

  if (!announcementId) {
    return NextResponse.json({ error: "Announcement Id  not provided" }, { status: 400 });
  }

  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    return NextResponse.json(announcement);
  } catch (error) {
    return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
  }
}
