import type { IFacility } from "./facilities.interface";
export declare const facilitiesService: {
    createFacilitiesIntoDB: (payload: IFacility) => Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getAllFacilitiesFromDB: () => Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getSingleFacilitiesFromDB: (id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    updateFacilityFromDB: (payload: Partial<IFacility>, id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    deleteFacilityFromDB: (id: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=facilities.service.d.ts.map