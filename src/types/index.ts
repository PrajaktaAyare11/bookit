export interface Experience {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  about: string;
  price: number;
  taxPercent: number;
  slots: number;
  availableDates: Date[];
  availableTimes: string[];
  createdAt: Date;
  slotAvailability?: Record<string, Record<string, number>>; // NEW
}

export interface BookingData {
  experienceId: number;
  experienceTitle: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
}

export interface PromoCode {
  code: string;
  discountPct?: number;
  flatAmount?: number;
  isActive: boolean;
  expiresAt?: Date;
}