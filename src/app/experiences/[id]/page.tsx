"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceSummary from "@/components/PriceSummary";
import { Experience } from "@/types";
import { BarLoader } from "react-spinners";

export default function ExperienceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Fetch experience data
  useEffect(() => {
    if (!id) return;
    
    fetch(`/api/experiences/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExperience(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch experience:", error);
        setLoading(false);
      });
  }, [id]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    // Check if enough slots available
    const availableSlots = getRemainingSlots(selectedDate, selectedTime);
    if (availableSlots < quantity) {
      alert(`Only ${availableSlots} slots available for this time`);
      return;
    }

    // Navigate to checkout with booking data
    const bookingData = {
      experienceId: experience?.id,
      experienceTitle: experience?.title,
      selectedDate,
      selectedTime,
      quantity,
      subtotal: (experience?.price || 0) * quantity,
      taxAmount: ((experience?.price || 0) * quantity * (experience?.taxPercent || 0)) / 100,
      totalAmount:
        (experience?.price || 0) * quantity +
        ((experience?.price || 0) * quantity * (experience?.taxPercent || 0)) / 100,
    };

    // Store in sessionStorage for checkout page
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/checkout");
  };

  // Get remaining slots for a specific date-time combo
  const getRemainingSlots = (date: string, time: string) => {
    if (!experience?.slotAvailability) return 0;
    return experience.slotAvailability[date]?.[time] ?? 0;
  };

  if (loading) {
    return (
      <div>
        <BarLoader className="mt-4" width={"100%"} color="#facc15" />
        <p className="text-gray-500 text-center">Loading experience...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">Experience not found</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Details</span>
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
        {/* Left Column - Experience Details */}
        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative w-full max-w-[765px] aspect-[765/381] rounded-lg overflow-hidden mx-auto">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold">{experience.title}</h1>

          {/* Description */}
          <p className="text-gray-600 font-medium leading-relaxed">{experience.description}</p>

          {/* Choose Date */}
          <div>
            <h2 className="text-lg font-medium mb-3">Choose date</h2>
            <div className="flex gap-2 flex-wrap">
              {experience.availableDates.map((date, index) => {
                const dateStr = new Date(date).toISOString().split("T")[0];
                return (
                  <Button
                    key={index}
                    onClick={() => setSelectedDate(dateStr)}
                    variant={selectedDate === dateStr ? "default" : "outline"}
                    className={
                      selectedDate === dateStr
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black border-0"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }
                  >
                    {formatDate(date)}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Choose Time */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Choose time</h2>
            <div className="flex gap-2 flex-wrap">
              {experience.availableTimes.map((time, index) => {
                const remainingSlots = selectedDate 
                  ? getRemainingSlots(selectedDate, time)
                  : experience.slots;
                const isSoldOut = remainingSlots === 0;
                const isLowStock = remainingSlots > 0 && remainingSlots <= 4;

                return (
                  <div key={index} className="relative">
                    <Button
                      onClick={() => !isSoldOut && setSelectedTime(time)}
                      disabled={isSoldOut}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={
                        isSoldOut
                          ? "bg-[#9f9f9f] border-gray-500 text-gray-800 cursor-not-allowed hover:bg-gray-300"
                          : selectedTime === time
                          ? "bg-yellow-400 hover:bg-yellow-500 text-black border-0"
                          : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200"
                      }
                    >
                      <span>{time}</span>
                      {isLowStock && !isSoldOut && (
                        <span className="text-xs text-red-600 ml-2">
                          {remainingSlots}-left
                        </span>
                      )}
                      {isSoldOut && (
                        <span className="text-xs text-black ml-2">Sold out</span>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All times are in IST (GMT +5:30)
            </p>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-sm text-gray-400 bg-[#efefef] p-4 rounded-lg">
              {experience.about}
            </p>
          </div>
        </div>

        {/* Right Column - Price Summary */}
        <div>
          <PriceSummary
            price={experience.price}
            quantity={quantity}
            taxPercent={experience.taxPercent}
            onQuantityChange={setQuantity}
            onConfirm={handleConfirm}
            isConfirmEnabled={!!selectedDate && !!selectedTime}
          />
        </div>
      </div>
    </div>
  );
}