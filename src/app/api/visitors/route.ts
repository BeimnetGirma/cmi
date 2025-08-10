import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
  let visitorCount = await prisma.visitorCount.findUnique({
    where: { id: 1 },
  });

  // If it doesn't exist yet, create it
  if (!visitorCount) {
    visitorCount = await prisma.visitorCount.create({
      data: { id: 1, count: 0 },
    });
  }

  return NextResponse.json({ count: visitorCount.count });
}

export async function POST() {
  // Increment the count
  const updated = await prisma.visitorCount.update({
    where: { id: 1 },
    data: { count: { increment: 1 } },
  });

  return NextResponse.json({ count: updated.count });
}
