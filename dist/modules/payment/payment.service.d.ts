import { PaymentStatus, RequestStatus } from "../../generated/prisma/enums.js";
import { IPayment } from "./payment.interface.js";
export declare const paymentService: {
    createPaymentIntoDB: (tenantId: string, payload: IPayment) => Promise<{
        payment: {
            rentalRequest: {
                property: {
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
            };
        } & {
            id: string;
            status: PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            transactionId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            provider: import("../../generated/prisma/enums.js").PaymentProvider;
            paidAt: Date | null;
            rentalRequestId: string;
        };
        checkoutUrl: string | null;
    }>;
    confirmPaymentIntoDB: (paymentId: string) => Promise<{
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        provider: import("../../generated/prisma/enums.js").PaymentProvider;
        paidAt: Date | null;
        rentalRequestId: string;
    }>;
    getMyPaymentsFromDB: (tenantId: string) => Promise<({
        rentalRequest: {
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
                availability: import("../../generated/prisma/enums.js").Availability;
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
        };
    } & {
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        provider: import("../../generated/prisma/enums.js").PaymentProvider;
        paidAt: Date | null;
        rentalRequestId: string;
    })[]>;
    getSinglePaymentFromDB: (paymentId: string, tenantId: string) => Promise<{
        rentalRequest: {
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
                availability: import("../../generated/prisma/enums.js").Availability;
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
        };
    } & {
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        provider: import("../../generated/prisma/enums.js").PaymentProvider;
        paidAt: Date | null;
        rentalRequestId: string;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map