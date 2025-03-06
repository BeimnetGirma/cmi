import { renameFile } from "@/lib/utils";
import fs, { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const RESOURCE_UPLOAD_DIR = "public/uploads/resources";

export const responseLimit = "50mb";
export const maxDuration = 60; // Set max execution time to 60 seconds

// Routes to upload pdf files and save them to the database.
export async function POST(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), RESOURCE_UPLOAD_DIR);
    console.log(`Upload directory: ${uploadDir}`);

    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file found" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = renameFile(file);
    const filePath = path.join(uploadDir, fileName);

    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
      } catch (mkdirError) {
        console.error("Failed to create upload directory:", mkdirError);
        return NextResponse.json(
          {
            success: false,
            message: "Server error: Failed to create upload directory",
          },
          { status: 500 }
        );
      }
    }

    try {
      await new Promise<void>((resolve, reject) => {
        writeFile(filePath, new Uint8Array(buffer), (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log(`File uploaded successfully: ${filePath}`);

      return NextResponse.json({
        success: true,
        path: fileName,
      });
    } catch (writeError) {
      console.error("Failed to write file:", writeError);
      return NextResponse.json(
        {
          success: false,
          message: "Server error: Failed to save file",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in resource upload:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

// GET request to download the uploaded pdf files.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    if (!filename) {
      return NextResponse.json(
        { success: false, message: "Filename query parameter is required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), RESOURCE_UPLOAD_DIR);
    const filePath = path.join(uploadDir, filename);

    try {
      const file = fs.readFileSync(filePath);
      return new NextResponse(file, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${filename}"`,
        },
      });
    } catch (error) {
      console.error(`File not found: ${filePath}`, error);
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in resource download:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    if (!filename) {
      return NextResponse.json(
        { success: false, message: "Filename query parameter is required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), RESOURCE_UPLOAD_DIR);
    const filePath = path.join(uploadDir, filename);

    try {
      fs.rmSync(filePath);
      return NextResponse.json({ success: true, message: "File deleted" });
    } catch (error) {
      console.error(`Failed to delete file: ${filePath}`, error);
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in resource deletion:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
