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
    const filename = `${Date.now()}-${file.name}`.replace(" ", "");
    const filePath = path.join(process.cwd(), "uploads/profile", path.basename(filename)); // Save to the 'uploads' folder in 'public'

    // Make sure the 'uploads' directory exists, otherwise create it
    const uploadsDir = path.join(process.cwd(), "uploads/profile");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Convert file to buffer and write to the file system
    const fileStream = fs.createWriteStream(filePath);
    const buffer = Buffer.from(await file.arrayBuffer());
    fileStream.write(buffer);
    fileStream.end();

    // Store the file path in the database
    const image = await prisma.profilePicture.create({
      data: {
        imagePath: `/api/file/profile/${filename}`, // Store the relative path to the file
      },
    });

    // Return the image object with the file path
    return NextResponse.json({ success: true, imagePath: image.imagePath });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
