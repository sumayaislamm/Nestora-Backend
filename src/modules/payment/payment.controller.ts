import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status";
import { paymentService } from "./payment.service.js";

const createPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const tenantId = req.user!.id;

        const payment = await paymentService.createPaymentIntoDB(
            tenantId,
            payload
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Payment created successfully",
            data: { payment },
        });
    }
);

const confirmPayment = catchAsync(
    async (req: Request, res: Response) => {
        const { paymentId } = req.body;

        const payment = await paymentService.confirmPaymentIntoDB(paymentId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment confirmed successfully",
            data: { payment },
        });
    }
);
//my payment 
const getMyPayments = catchAsync(
    async (req: Request, res: Response) => {
        const tenantId = req.user!.id;

        const payments = await paymentService.getMyPaymentsFromDB(tenantId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payments fetched successfully",
            data: {
                payments,
            },
        });
    }
);

//single payment

const getSinglePayment = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const tenantId = req.user!.id;

        const payment = await paymentService.getSinglePaymentFromDB(
            id as string,
            tenantId
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment fetched successfully",
            data: {
                payment,
            },
        });
    }
);
export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getSinglePayment,
}