import prisma from "@/db";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const images = await prisma.profilePicture.findMany();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  try {
    // Read image file, caption, and tag from request formData
    const data = await req.formData();
    const file: File | null = data.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    // Generate a unique filename for the image (you could use a UUID or timestamp for uniqueness)
    const originalName = file.name;
    const safeName = originalName
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/[^a-zA-Z0-9.\-_]/g, ""); // remove unsafe characters

    const filename = `${Date.now()}-${safeName}`;
    // const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "uploads/images", path.basename(filename)); // Save to the 'uploads' folder in 'public'

    // Make sure the 'uploads' directory exists, otherwise create it
    const uploadsDir = path.join(process.cwd(), "uploads/images");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Convert file to buffer and write to the file system in chunks
    const fileStream = fs.createWriteStream(filePath);
    const reader = file.stream().getReader();
    let chunk;
    while (!(chunk = await reader.read()).done) {
      fileStream.write(Buffer.from(chunk.value));
    }
    fileStream.end();

    // Store the file path in the database
    const image = await prisma.profilePicture.create({
      data: {
        imagePath: `/api/file/images/${filename}`, // Store the relative path to the file
      },
    });

    // Return the image object with the file path
    return NextResponse.json({ success: true, imagePath: image.imagePath });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
