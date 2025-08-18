import prisma from "@/db";

export async function GET() {
  const trainee = await prisma.traineeCount.findUnique({ where: { id: 1 } });
  const bim = await prisma.bIMCount.findUnique({ where: { id: 1 } });
  const pmp = await prisma.pMPCount.findUnique({ where: { id: 1 } });

  return Response.json({
    traineeCount: trainee?.count ?? 0,
    bimCount: bim?.count ?? 0,
    pmpCount: pmp?.count ?? 0,
  });
}

export async function POST(req: Request) {
  const { traineeCount, bimCount, pmpCount } = await req.json();

  await prisma.traineeCount.upsert({
    where: { id: 1 },
    update: { count: traineeCount },
    create: { id: 1, count: traineeCount },
  });

  await prisma.bIMCount.upsert({
    where: { id: 1 },
    update: { count: bimCount },
    create: { id: 1, count: bimCount },
  });

  await prisma.pMPCount.upsert({
    where: { id: 1 },
    update: { count: pmpCount },
    create: { id: 1, count: pmpCount },
  });

  return Response.json({ message: "Stats updated" });
}
