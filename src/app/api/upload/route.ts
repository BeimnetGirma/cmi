import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), "public/uploads/research");
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) return NextResponse.json({ success: false, message: "No file found" });
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public/uploads/research", file.name);
  // Ensure the uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  await writeFile(filePath, buffer);
  console.log("File uploaded successfully");
  console.log(filePath);

  return NextResponse.json({ success: true, path: `/uploads/research/${file.name}` });
}
