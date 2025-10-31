"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { toast } from "sonner"; 
import { BarLoader } from "react-spinners"; 

interface BookingData {
  experienceId: number;
  experienceTitle: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [promoError, setPromoError] = useState("");

  // Simulated loading
  const [isLoading, setIsLoading] = useState(true);

  // Load booking data from sessionStorage
  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 700)); // 👈 show loader for 0.7s
      const data = sessionStorage.getItem("bookingData");
      if (data) {
        setBookingData(JSON.parse(data));
      } else {
        router.push("/");
      }
      setIsLoading(false);
    };
    load();
  }, [router]);

  // Validate email format
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setPromoError("");

    try {
      const response = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await response.json();

      if (response.ok && data.isValid) {
        let discount = 0;
        if (data.discountPct) {
          discount = (bookingData!.subtotal * data.discountPct) / 100;
        } else if (data.flatAmount) {
          discount = data.flatAmount;
        }

        setPromoDiscount(discount);
        setPromoApplied(true);
        setPromoError("");
      } else {
        setPromoError("Invalid promo code");
        setPromoDiscount(0);
        setPromoApplied(false);
      }
    } catch (error) {
      console.error("Failed to validate promo:", error);
      setPromoError("Failed to validate promo code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors before validation
    setNameError("");
    setEmailError("");
    setTermsError("");

    let errors = false;

    if (!fullName.trim()) {
      setNameError("Please enter your full name");
      errors = true;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email");
      errors = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      errors = true;
    }

    if (!agreedToTerms) {
      setTermsError("You must agree to the terms and safety policy");
      errors = true;
    }

    if (errors) return;

    setIsSubmitting(true);

    try {
      const refId = `HUF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const finalTotal = bookingData!.totalAmount - promoDiscount;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refId,
          name: fullName,
          email,
          experienceId: bookingData!.experienceId,
          selectedDate: bookingData!.selectedDate,
          selectedTime: bookingData!.selectedTime,
          quantity: bookingData!.quantity,
          subtotal: bookingData!.subtotal,
          taxAmount: bookingData!.taxAmount,
          totalAmount: finalTotal,
          promoCode: promoApplied ? promoCode : null,
        }),
      });

      if (response.ok) {
        toast.success("🎉 Booking successful!", { position: "bottom-right" });
        sessionStorage.removeItem("bookingData");
        router.push(`/confirmation?refId=${refId}`);
      } else {
        toast.error("❌ Booking failed. Please try again.", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show yellow loader when loading
  if (isLoading) {
    return (
      <div>
        <BarLoader className="mt-4" width={"100%"} color="#facc15" />
        <p className="text-gray-500 mt-4 text-center">Loading...</p>
      </div>
    );
  }

  if (!bookingData) return null;

  const finalTotal = bookingData.totalAmount - promoDiscount;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-9/11">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Checkout</span>
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
        {/* Left Column - Form Card */}
        <Card
  className="
    p-6 bg-[#efefef] border-gray-200 
    w-full max-w-[740px] mx-auto
    lg:h-auto sm:h-auto
  "
>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name and Email in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setNameError("");
                  }}
                  className={`bg-[#dddddd] border-[#dddddd] ${nameError ? "border-red-500" : ""}`}
                />
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className={`bg-[#dddddd] border-[#dddddd] ${emailError ? "border-red-500" : ""}`}
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  className="bg-[#dddddd] border-[#dddddd] flex-1"
                />
                <Button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-black hover:bg-gray-800 text-white px-6 h-10 font-normal"
                >
                  Apply
                </Button>
              </div>
              {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
              {promoApplied && (
                <p className="text-green-600 text-xs mt-1">Promo code applied successfully!</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => {
                    setAgreedToTerms(checked as boolean);
                    setTermsError("");
                  }}
                  className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:text-white"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
              {termsError && <p className="text-red-500 text-xs mt-1">{termsError}</p>}
            </div>
          </form>
        </Card>

        {/* Right Column - Booking Summary Card */}
        <Card className="p-6 bg-[#efefef] border-gray-200 space-y-3 w-full max-w-[400px] lg:sticky lg:top-24 mx-auto">

          {/* Experience */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Experience</span>
            <span className="text-sm font-medium text-right">
              {bookingData.experienceTitle}
            </span>
          </div>

          {/* Date */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm font-medium">{formatDate(bookingData.selectedDate)}</span>
          </div>

          {/* Time */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Time</span>
            <span className="text-sm font-medium">{bookingData.selectedTime}</span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Qty</span>
            <span className="text-sm font-medium">{bookingData.quantity}</span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">₹{bookingData.subtotal}</span>
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Taxes</span>
            <span className="text-sm font-medium">₹{Math.round(bookingData.taxAmount)}</span>
          </div>

          {/* Promo Discount */}
          {promoApplied && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm">Promo Discount</span>
              <span className="text-sm font-medium">-₹{promoDiscount}</span>
            </div>
          )}

          <hr className="border-gray-300" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-base font-medium">Total</span>
            <span className="text-xl font-semibold">₹{Math.round(finalTotal)}</span>
          </div>

          {/* Pay Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-10 font-semibold bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            {isSubmitting ? "Processing..." : "Pay and Confirm"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
