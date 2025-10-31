import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.experience.createMany({
    data: [
        {
    id: 1,
    title: "Kayaking",
    location: "Udupi",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/Kayak1.jpg",
    about: "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    price: 999,
    taxPercent: 6.0,
    slots: 4,
    availableDates: [
      new Date("2025-10-22"),
      new Date("2025-10-23"),
      new Date("2025-10-24"),
    ],
    availableTimes: ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"],
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/sunrise1.webp",
    about: "Early morning trek with stunning sunrise views.",
    price: 899,
    taxPercent: 6.0,
    slots: 8,
    availableDates: [new Date("2025-10-22"), new Date("2025-10-23")],
    availableTimes: ["05:00 am", "05:30 am"],
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Coffee Trail",
    location: "Coorg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/coffeTrail1.jpg",
    about: "Explore coffee plantations and learn about coffee making.",
    price: 1299,
    taxPercent: 6.0,
    slots: 6,
    availableDates: [new Date("2025-10-25"), new Date("2025-10-26")],
    availableTimes: ["09:00 am", "02:00 pm"],
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "Kayaking",
    location: "Udupi, Karnataka",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/Kayak2.jpg",
    about: "Scenic routes through mangroves.",
    price: 999,
    taxPercent: 6.0,
    slots: 0, // Sold out
    availableDates: [],
    availableTimes: [],
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/sunrise2.jpg",
    about: "Early morning trek with stunning sunrise views.",
    price: 899,
    taxPercent: 6.0,
    slots: 8,
    availableDates: [new Date("2025-10-22"), new Date("2025-10-23")],
    availableTimes: ["05:00 am", "05:30 am"],
    createdAt: new Date(),
  },
  {
    id: 6,
    title: "Boat Cruise",
    location: "Sunderbans",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/cruise.jpg",
    about: "Wildlife spotting and river cruise experience.",
    price: 999,
    taxPercent: 6.0,
    slots: 10,
    availableDates: [new Date("2025-10-28"), new Date("2025-10-29")],
    availableTimes: ["08:00 am", "01:00 pm"],
    createdAt: new Date(),
  },
  {
    id: 7,
    title: "Bungee Jumping",
    location: "Manali",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/bungee.jpg",
    about: "Extreme adventure with professional safety measures.",
    price: 999,
    taxPercent: 6.0,
    slots: 2,
    availableDates: [new Date("2025-11-01")],
    availableTimes: ["10:00 am", "12:00 pm", "03:00 pm"],
    createdAt: new Date(),
  },
  {
    id: 8,
    title: "Coffee Trail",
    location: "Coorg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    image: "/coffeeTrail2.jpg",
    about: "Premium coffee estate tour with tasting session.",
    price: 1299,
    taxPercent: 6.0,
    slots: 5,
    availableDates: [new Date("2025-10-30")],
    availableTimes: ["09:00 am", "11:00 am"],
    createdAt: new Date(),
  },
    ],
  });

  await prisma.promo.createMany({
    data: [
      { code: "WELCOME10", discountPct: 10.0 },
      { code: "FLAT200", flatAmount: 200.0 },
    ],
  });

  console.log("✅ Seed data inserted!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


