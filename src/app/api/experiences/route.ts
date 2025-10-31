import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔍 Connecting to DB...");
    const experiences = await prisma.experience.findMany({
      orderBy: { id: "asc" },
    });
    console.log("✅ DB Connected. Found", experiences.length, "experiences.");
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("❌ Prisma DB connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed", details: String(error) },
      { status: 500 }
    );
  }
}
