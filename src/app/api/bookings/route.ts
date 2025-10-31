import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const booking = await prisma.booking.create({
      data: {
        refId: body.refId,
        name: body.name,
        email: body.email,
        experienceId: body.experienceId,
        selectedDate: new Date(body.selectedDate),
        selectedTime: body.selectedTime,
        quantity: body.quantity,
        subtotal: body.subtotal,
        taxAmount: body.taxAmount,
        totalAmount: body.totalAmount,
        promoCode: body.promoCode || null,
        status: "confirmed",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}