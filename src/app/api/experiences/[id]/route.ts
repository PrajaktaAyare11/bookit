import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
      include: {
        bookings: {
          where: {
            status: "confirmed",
          },
          select: {
            selectedDate: true,
            selectedTime: true,
            quantity: true,
          },
        },
      },
    });

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    // Calculate remaining slots per date-time combination
    const slotAvailability: Record<string, Record<string, number>> = {};

    experience.availableDates.forEach((date) => {
      const dateStr = new Date(date).toISOString().split("T")[0];
      slotAvailability[dateStr] = {};

      experience.availableTimes.forEach((time) => {
        // Calculate total booked for this date-time combo
        const bookedQuantity = experience.bookings
          .filter((booking) => {
            const bookingDate = new Date(booking.selectedDate)
              .toISOString()
              .split("T")[0];
            return bookingDate === dateStr && booking.selectedTime === time;
          })
          .reduce((sum, booking) => sum + booking.quantity, 0);

        // Remaining slots
        slotAvailability[dateStr][time] = Math.max(
          0,
          experience.slots - bookedQuantity
        );
      });
    });

    // Return experience with slot availability
    const { bookings, ...experienceData } = experience;

    return NextResponse.json({
      ...experienceData,
      slotAvailability,
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}