export type SlotStatus = "available" | "booked" | "blocked";
export type BookingStatus = "confirmed" | "cancelled" | "completed" | "no_show";

export interface Specialist {
  id: number;
  name: string;
  slug: string;
  bio: string;
  photoUrl: string | null;
  tags: string[];
  appointmentTypes: string[];
  notificationEmail: string | null;
  isActive: boolean;
}

export interface AvailabilitySlot {
  id: number;
  specialistId: number;
  startAt: string;
  endAt: string;
  status: SlotStatus;
  allowedAppointmentTypes: string[];
}

export interface BookingInput {
  specialistId: number;
  slotId: number;
  appointmentType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  contactConsent: boolean;
  website?: string;
}

export interface BookingResult {
  id: number;
  specialistName: string;
  appointmentType: string;
  startAt: string;
  endAt: string;
}

