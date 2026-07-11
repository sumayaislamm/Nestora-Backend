import { Status } from "../../../generated/prisma/enums";
export declare const adminService: {
    getAllUsersFromDB: () => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        profileImage: string | null;
        role: import("../../../generated/prisma/enums").Role;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUserStatusIntoDB: (userId: string, status: Status) => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        profileImage: string | null;
        role: import("../../../generated/prisma/enums").Role;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllPropertiesFromDB: () => Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        landlord: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../../generated/prisma/enums").Role;
        };
    } & {
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
    })[]>;
    getAllRentalRequestsFromDB: () => Promise<({
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            landlord: {
                id: string;
                name: string;
                email: string;
            };
        } & {
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
        };
        tenant: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
        };
        payment: {
            id: string;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            transactionId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            provider: import("../../../generated/prisma/enums").PaymentProvider;
            paidAt: Date | null;
            rentalRequestId: string;
        } | null;
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map