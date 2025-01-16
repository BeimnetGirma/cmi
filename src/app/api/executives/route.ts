import { NextRequest } from "next/server";

// // GET request to download the uploaded pdf files.
// export async function GET(req: NextRequest) {
//     // read
//     // const { searchParams } = new URL(req.url);
//     // const filename = searchParams.get("filename");
//     // if (!filename) {
//     //   return NextResponse.json(
//     //     { success: false, message: "Filename query parameter is required" },
//     //     { status: 400 }
//     //   );
//     // }

//     // const filePath = path.join(process.cwd(), STANDARD_UPLOAD_DIR, filename);

//     // try {
//     //   const file = fs.readFileSync(filePath);
//     //   return new NextResponse(file, {
//     //     headers: {
//     //       "Content-Type": "application/pdf",
//     //       "Content-Disposition": `inline; filename="${filename}"`,
//     //     },
//     //   });
//     // } catch (error) {
//     //   return NextResponse.json(
//     //     { success: false, message: "File not found" },
//     //     { status: 404 }
//     //   );
//     // }
//   }
