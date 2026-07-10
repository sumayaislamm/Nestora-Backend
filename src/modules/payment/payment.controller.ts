import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";

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
   export const paymentController = {
    createPayment,
    confirmPayment,
   }