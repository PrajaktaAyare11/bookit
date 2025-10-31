import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    const promo = await prisma.promo.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json(
        { isValid: false, message: "Invalid promo code" },
        { status: 400 }
      );
    }

    // Check if expired
    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return NextResponse.json(
        { isValid: false, message: "Promo code expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      isValid: true,
      code: promo.code,
      discountPct: promo.discountPct,
      flatAmount: promo.flatAmount,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate promo code" },
      { status: 500 }
    );
  }
}