import { PaymentStatus, RequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IPayment } from "./payment.interface";

const createPaymentIntoDB = async (
    tenantId: string,
    payload: IPayment
) => {
    const { rentalRequestId, provider } = payload;

    // Rental request exists or not,
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

    // Tenant exits
    if (rentalRequest.tenantId !== tenantId) {
        throw new Error("You are not authorized");
    }

    // approve
    if (rentalRequest.status !== RequestStatus.APPROVED) {
        throw new Error("Rental request is not approved yet");
    }

    //paid or not
    const existingPayment = await prisma.payment.findUnique({
        where: {
            rentalRequestId,
        },
    });

    if (existingPayment) {
        throw new Error("Payment already exists");
    }

    // create transaction id
    const transactionId = `TX-${Date.now()}`;

    // Create payment
    const payment = await prisma.payment.create({
        data: {
            rentalRequestId,
            amount: rentalRequest.property.rent,
            provider,
            transactionId,
            status: PaymentStatus.PENDING,
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                    tenant: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });

    return payment;
};

const confirmPaymentIntoDB = async (paymentId: string) => {

    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId,
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                },
            },
        },
    });

    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.status === "COMPLETED") {
        throw new Error("Payment already completed");
    }

    const result = await prisma.$transaction(async (tx) => {

        const updatedPayment = await tx.payment.update({
            where: {
                id: paymentId,
            },
            data: {
                status: "COMPLETED",
                paidAt: new Date(),
            },
        });

        await tx.rentalRequest.update({
            where: {
                id: payment.rentalRequestId,
            },
            data: {
                status: "COMPLETED",
            },
        });

        await tx.property.update({
            where: {
                id: payment.rentalRequest.propertyId,
            },
            data: {
                availability: "RENTED",
            },
        });

        return updatedPayment;
    });

    return result;
};

//Get My Payments
const getMyPaymentsFromDB = async (tenantId: string) => {
    const payments = await prisma.payment.findMany({
        where: {
            rentalRequest: {
                tenantId,
            },
        },

        orderBy: {
            createdAt: "desc",
        },

        include: {
            rentalRequest: {
                include: {
                    property: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    return payments;
};

//Single Payment
const getSinglePaymentFromDB = async (
    paymentId: string,
    tenantId: string
) => {
    const payment = await prisma.payment.findUniqueOrThrow({
        where: {
            id: paymentId,
            rentalRequest: {
                tenantId,
            },
        },
        // where: {
        //     id: paymentId,
        // },

        include: {
            rentalRequest: {
                include: {
                    property: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    if (payment.rentalRequest.tenantId !== tenantId) {
        throw new Error("You are not authorized to view this payment");
    }

    return payment;
};

export const paymentService = {
    createPaymentIntoDB,
    confirmPaymentIntoDB,
    getMyPaymentsFromDB,
    getSinglePaymentFromDB,
}