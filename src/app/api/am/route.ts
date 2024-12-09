import fs from "fs";
import path from "path";
// const filePath = path.resolve("src/app/i18n/locales/en/translation.json");
const filePath = path.join(process.cwd(), "src/app/i18n/locales/am/translation.json");
console.log(filePath);

export async function GET() {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());
  return Response.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log(data);

  return Response.json({ message: "JSON file has been updated successfully" });
}
