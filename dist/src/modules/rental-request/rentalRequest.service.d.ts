import { IRentalRequest } from "./rentalRequest.interface";
import { RequestStatus } from "../../../generated/prisma/enums";
export declare const rentalRequestService: {
    createRentalRequestIntoDB: (tenantId: string, payload: IRentalRequest) => Promise<{
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
        };
    } & {
        id: string;
        status: RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    }>;
    getAllRentalsFromDB: (tenantId: string) => Promise<({
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
    } & {
        id: string;
        status: RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    })[]>;
    singleRentalIntoDB: (rentalId: string, tenantId: string) => Promise<{
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
        };
    } & {
        id: string;
        status: RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    }>;
    getLandlordRequestsFromDB: (landlordId: string) => Promise<({
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
    } & {
        id: string;
        status: RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    })[]>;
    updateRentalStatusIntoDB: (rentalRequestId: string, landlordId: string, payload: {
        status: RequestStatus;
    }) => Promise<{
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
        };
    } & {
        id: string;
        status: RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        moveInDate: Date;
        tenantId: string;
        propertyId: string;
    }>;
};
//# sourceMappingURL=rentalRequest.service.d.ts.map