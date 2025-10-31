"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refId = searchParams.get("refId");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!refId) {
      router.push("/");
      return;
    }

    // Optional: Auto-redirect to home after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Uncomment to enable auto-redirect
          // router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refId, router]);

  if (!refId) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-15 max-w-2xl">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        {/* Success Icon */}
        <Image 
          src="/Green-Tick.png" 
          alt="Success" 
          width={60} 
          height={60} 
        />

        {/* Success Message */}
        <div className="space-y-3">
          <h1 className="text-3xl  text-gray-900">
            Booking Confirmed
          </h1>
          <p className="text-gray-600">
            Ref ID: <span>{refId}</span>
          </p>
        </div>

        {/* Back to Home Button */}
        <Button
          onClick={() => router.push("/")}
          className="bg-[#E3E3E3] hover:bg-[#e9e7e7] text-gray-800 font-medium px-8 h-11 mt-4"
        >
          Back to Home
        </Button>

        {/* Optional: Auto-redirect message */}
        {/* <p className="text-sm text-gray-500 mt-4">
          Redirecting to home in {countdown} seconds...
        </p> */}
      </div>
    </div>
  );
}