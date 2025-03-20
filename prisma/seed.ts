import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing resource types to avoid duplicates
  try {
    await prisma.resourceType.deleteMany({});
    console.log("Cleared existing resource types");
  } catch (error) {
    console.warn("Error clearing resource types (may not exist yet):", error);
  }

  // Seed resource types
  const resourceTypes = [
    { name: "PDF" },
    { name: "Video" },
    { name: "Book" },
    { name: "Article" },
    { name: "Presentation" },
    { name: "Audio" },
    { name: "Research Paper" },
    { name: "Case Study" },
    { name: "Publication" },
    { name: "Dataset" },
    { name: "Tool" },
    { name: "Other" },
  ];

  console.log(`Seeding ${resourceTypes.length} resource types...`);

  try {
    // Create resource types
    for (const resourceType of resourceTypes) {
      await prisma.resourceType.create({
        data: resourceType,
      });
    }

    // Check if seeding was successful
    const count = await prisma.resourceType.count();
    console.log(`Database seeded successfully with ${count} resource types`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Error in seed script:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
