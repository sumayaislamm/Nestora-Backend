import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
    return await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};



const updateUserStatusIntoDB = async (
    userId: string,
    status: Status
) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }


    return await prisma.user.update({
        where: { id: userId },
        data: {
            status,
        },
    });
};

const getAllPropertiesFromDB = async () => {
    return await prisma.property.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true,
                },
            },
            category: true,
        },
    });
};


const getAllRentalRequestsFromDB = async () => {
    return await prisma.rentalRequest.findMany({
        orderBy: {
            createdAt: "desc",
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
                    landlord: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
};

export const adminService = {
    getAllUsersFromDB,
    updateUserStatusIntoDB,
    getAllPropertiesFromDB,
    getAllRentalRequestsFromDB
}