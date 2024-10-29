import fs from "fs";
import path from "path";
// const filePath = path.resolve("src/app/i18n/locales/en/translation.json");
const filePath = path.join(
  process.cwd(),
  "src/app/i18n/locales/en/translation.json"
);
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

// export default function handler() {
//   const filePath = '../i18n/locales/en/translation.json';

//   if (req.method === 'GET') {
//     // Read the JSON file
//     const jsonData = fs.readFileSync(filePath);
//     const data = JSON.parse(jsonData.toString());

//     return Response.status(200).json(data);

//   } else if (req.method === 'POST') {
//     // Write to the JSON file
//     const newData = req.body;

//     fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

//     res.status(200).json({ message: 'JSON file has been updated successfully' });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
