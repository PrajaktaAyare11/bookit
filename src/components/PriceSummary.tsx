"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface PriceSummaryProps {
  price: number;
  quantity: number;
  taxPercent: number;
  onQuantityChange: (newQuantity: number) => void;
  onConfirm: () => void;
  isConfirmEnabled: boolean;
}

export default function PriceSummary({
  price,
  quantity,
  taxPercent,
  onQuantityChange,
  onConfirm,
  isConfirmEnabled,
}: PriceSummaryProps) {
  const subtotal = price * quantity;
  const taxes = (subtotal * taxPercent) / 100;
  const total = subtotal + taxes;

  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="bg-[#efefef] p-6 rounded-lg space-y-4 h-[303] w-[387]">
      {/* Starts at */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Starts at</span>
        <span className="text-lg font-semibold">₹{price}</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            className="w-4 h-4 flex items-center justify-center border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-sm w-2 text-center font-light">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-4 h-4 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Subtotal</span>
        <span className="text-sm font-semibold">₹{subtotal}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Taxes</span>
        <span className="text-sm font-semibold">₹{Math.round(taxes)}</span>
      </div>

      <hr className="border-gray-300" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-base font-semibold">Total</span>
        <span className="text-xl font-bold">₹{Math.round(total)}</span>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={onConfirm}
        disabled={!isConfirmEnabled}
        className={`w-full h-12 font-semibold ${
          isConfirmEnabled
            ? "bg-yellow-400 hover:bg-yellow-500 text-black"
            : "bg-gray-300 text-gray-900 cursor-not-allowed hover:bg-gray-200"
        }`}
      >
        Confirm
      </Button>
    </div>
  );
}