import { prisma } from "../../lib/prisma";
const createRentalRequestIntoDB = async (tenantId, payload) => {
    const { propertyId, moveInDate, message } = payload;
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });
    if (!property) {
        throw new Error("Property not found");
    }
    if (property.availability === "RENTED") {
        throw new Error("This property is already rented");
    }
    // Landlord check 
    const tenant = await prisma.user.findUnique({
        where: {
            id: tenantId,
        },
    });
    if (!tenant) {
        throw new Error("Tenant not found");
    }
    if (property.landlordId === tenantId) {
        throw new Error("You cannot rent your own property");
    }
    const existingRequest = await prisma.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId,
            status: "PENDING",
        },
    });
    if (existingRequest) {
        throw new Error("Rental request already exists");
    }
    const rentalRequest = await prisma.rentalRequest.create({
        data: {
            propertyId,
            tenantId,
            moveInDate,
            message
        },
        include: {
            property: {
                include: {
                    category: true,
                },
            },
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return rentalRequest;
};
const getAllRentalsFromDB = async (tenantId) => {
    return await prisma.rentalRequest.findMany({
        where: {
            tenantId,
        },
        include: {
            property: {
                include: {
                    category: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const singleRentalIntoDB = async (rentalId, tenantId) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
        include: {
            property: {
                include: {
                    category: true,
                },
            },
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (rentalRequest.tenantId !== tenantId) {
        throw new Error("You are not authorized to view this rental request");
    }
    return rentalRequest;
};
const getLandlordRequestsFromDB = async (landlordId) => {
    return await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId,
            },
        },
        include: {
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            property: {
                include: {
                    category: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
import { RequestStatus } from "../../../generated/prisma/enums";
const updateRentalStatusIntoDB = async (rentalRequestId, landlordId, payload) => {
    // Rental Request exists?
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: {
            id: rentalRequestId,
        },
        include: {
            property: true,
        },
    });
    if (!rentalRequest) {
        throw new Error("Rental request not found");
    }
    // Check landlord ownership
    if (rentalRequest.property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this rental request");
    }
    // Already processed?
    if (rentalRequest.status !== RequestStatus.PENDING) {
        throw new Error("Rental request already processed");
    }
    // Only APPROVED / REJECTED allowed
    if (payload.status !== RequestStatus.APPROVED &&
        payload.status !== RequestStatus.REJECTED) {
        throw new Error("Invalid status");
    }
    const updatedRentalRequest = await prisma.rentalRequest.update({
        where: {
            id: rentalRequestId,
        },
        data: {
            status: payload.status,
        },
        include: {
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            property: {
                include: {
                    category: true,
                },
            },
        },
    });
    return updatedRentalRequest;
};
export const rentalRequestService = {
    createRentalRequestIntoDB,
    getAllRentalsFromDB,
    singleRentalIntoDB,
    getLandlordRequestsFromDB,
    updateRentalStatusIntoDB
};
//# sourceMappingURL=rentalRequest.service.js.map