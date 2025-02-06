import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  //   const { filename } = req.query;
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract the 'id' from the URL
  const p = url.pathname.split("/");

  const filePath = path.join(process.cwd(), "uploads", p[3], p[4]);

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    return new NextResponse(fileStream as any, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
