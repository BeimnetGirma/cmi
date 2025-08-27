import fs from "fs";
import path from "path";
import prisma from "@/db";
// const filePath = path.resolve("src/app/i18n/locales/en/translation.json");
const filePath = path.join(process.cwd(), "src/app/i18n/locales/en/translation.json");

export async function GET() {
  const translations = await prisma.translation.findMany({
    where: { language: "en" },
  });
  const json = Object.fromEntries(translations.map((t: { key: any; value: any }) => [t.key, t.value]));
  return Response.json(json);
}

export async function POST(req: Request) {
  const data = await req.json();
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    await prisma.translation.upsert({
      where: { key_language: { key, language: "en" } },
      update: { value: value as any },
      create: { key, language: "en", value: value as any },
    });
  }

  return Response.json({ message: "Translations updated." });
}
