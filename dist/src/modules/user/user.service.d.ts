import { RegisterUserRequest } from "./user.interface";
import { Role, Status } from "../../../generated/prisma/enums";
export declare const userService: {
    registerUserIntoDb: (payload: RegisterUserRequest) => Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        profileImage: string | null;
        role: Role;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMyProfileFromDB: (userId: string) => Promise<{
        properties: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            location: string;
            address: string;
            rent: import("@prisma/client-runtime-utils").Decimal;
            bedrooms: number;
            bathrooms: number;
            size: number | null;
            availability: import("../../../generated/prisma/enums").Availability;
            amenities: string[];
            images: string[];
            landlordId: string;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        profileImage: string | null;
        role: Role;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMyProfileIntoDB: (userId: string, payload: any) => Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        profileImage: string | null;
        role: Role;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map