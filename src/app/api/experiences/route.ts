import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(experiences);
}
