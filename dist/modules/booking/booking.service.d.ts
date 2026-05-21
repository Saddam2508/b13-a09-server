import type { IBookingPayload } from "../booking/booking.interface";
export declare const bookingService: {
    createBookingIntoDB: (payload: IBookingPayload) => Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getAllBookingFromDB: () => Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getSingleBookingFromDB: (id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    updateBookingFromDB: (payload: Partial<IBookingPayload>, id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    deleteBookingFromDB: (id: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map