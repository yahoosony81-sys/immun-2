export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

export interface Reservation extends ReservationFormData {
  id?: string;
  createdAt?: string;
  status?: "pending" | "confirmed" | "cancelled";
}

