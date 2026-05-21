import type { IFacility } from "../facilities/facilities.interface";
type BookingInfo = "image" | "facilityType" | "id" | "location" | "capacity" | "description" | "email" | "_id";
export type IBookingPayload = Omit<IFacility, BookingInfo> & {
    _id?: string;
    facilityId: string;
    user_email?: string;
    bookingDate: Date | null;
    hours?: number;
    total_price?: string;
    status: "pending" | "fulfilled";
};
export {};
//# sourceMappingURL=booking.interface.d.ts.map