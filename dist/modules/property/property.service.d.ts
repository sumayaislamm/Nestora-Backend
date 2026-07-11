import { IProperty } from "./property.interface.js";
export declare const propertyService: {
    createPropertyIntoDB: (landlordId: string, payload: IProperty) => Promise<{
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
        availability: import("../../generated/prisma/enums.js").Availability;
        amenities: string[];
        images: string[];
        landlordId: string;
        categoryId: string;
    }>;
    getAllPropertiesFromDB: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
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
                profileImage: string | null;
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
            availability: import("../../generated/prisma/enums.js").Availability;
            amenities: string[];
            images: string[];
            landlordId: string;
            categoryId: string;
        })[];
    }>;
    updatePropertyIntoDB: (propertyId: string, landlordId: string, payload: Partial<IProperty>) => Promise<{
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
        availability: import("../../generated/prisma/enums.js").Availability;
        amenities: string[];
        images: string[];
        landlordId: string;
        categoryId: string;
    }>;
    getSinglePropertyFromDB: (propertyId: string) => Promise<{
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
            profileImage: string | null;
            role: import("../../generated/prisma/enums.js").Role;
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
        availability: import("../../generated/prisma/enums.js").Availability;
        amenities: string[];
        images: string[];
        landlordId: string;
        categoryId: string;
    }>;
    deletePropertyFromDB: (propertyId: string, landlordId: string) => Promise<void>;
};
//# sourceMappingURL=property.service.d.ts.map