// scripts/import-translations.ts
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importFromJson(lang: string) {
  const filePath = path.join(process.cwd(), `src/app/i18n/locales/${lang}/translation.json`);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const [key, value] of Object.entries(json)) {
    await prisma.translation.upsert({
      where: { key_language: { key, language: lang } },
      update: { value: value as string },
      create: { key, language: lang, value: value as string },
    });
  }
}

importFromJson("en").then(() => {
  console.log("Imported EN translations");
  process.exit();
});
importFromJson("am").then(() => {
  console.log("Imported AM translations");
  process.exit();
});
// async function main() {
//   const existing = await prisma.translation.count();
//   if (existing > 0) {
//     console.log("Translations already seeded. Skipping...");
//     return;
//   }
//   await importFromJson("en");
//   await importFromJson("am");
//   // Add more if needed
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
