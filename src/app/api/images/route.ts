import prisma from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const images = await prisma.image.findMany();
  return images;
}

export async function POST(req: NextRequest) {
  // read image file, caption and tag from request formData and save to database
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const caption = data.get("caption") as string;
  const tags = data.get("tag") as string;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const image = await prisma.image.create({
    data: {
      caption,
      tags,
      imageData: buffer,
    },
  });
  return image;
}

export async function DELETE(req: NextRequest) {
  // delete image from database
  const { id } = req.query;
  const image = await prisma.image.delete({
    where: { id: id as string },
  });
  return image;
}
