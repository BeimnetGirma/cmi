import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract the 'id' from the URL

  if (!id) {
    return NextResponse.json(
      { error: "Image ID not provided" },
      { status: 400 }
    );
  }

  try {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  // delete image from database
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract the 'id' from the URL

  if (!id) {
    return NextResponse.json(
      { error: "Image ID not provided" },
      { status: 400 }
    );
  }

  try {
    const image = await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Image deleted successfully", image });
  } catch (error) {
    return NextResponse.json(
      { error: "Image not found or could not be deleted" },
      { status: 500 }
    );
  }
}
