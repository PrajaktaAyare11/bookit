import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error("Database fetch error:", error);
    return NextResponse.json(
      { error: "Database connection failed", details: error.message },
      { status: 500 }
    );
  }
}
