import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (payload: IUser) => Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getAllUsersFromDB: () => Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getSingleUserFromDB: (id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    updateUserFromDB: (payload: Partial<IUser>, id: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
    deleteUserFromDB: (id: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map