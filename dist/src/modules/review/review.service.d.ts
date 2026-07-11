import { IReview } from "./review.interface";
export declare const reviewService: {
    reviewCreateIntoDB: (tenantId: string, payload: IReview) => Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        propertyId: string;
        rating: number;
        comment: string | null;
    }>;
    getAllReviewsFromDB: () => Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        propertyId: string;
        rating: number;
        comment: string | null;
    })[]>;
};
//# sourceMappingURL=review.service.d.ts.map