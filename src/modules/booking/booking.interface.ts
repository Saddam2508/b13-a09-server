import type { IFacility } from "../facilities/facilities.interface";

type BookingInfo =
  | "facilityType"
  | "id"
  | "location"
  | "capacity"
  | "description"
  | "email"
  | "_id";

export type IBookingPayload = Omit<IFacility, BookingInfo> & {
  bookingId?: string;
  userId?: string;
  userImage?: string;
  userName?: string;
  facilityId: string;
  bookingDate: Date | null;
  status: "pending" | "fulfilled";
};
