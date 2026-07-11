import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";
const createPayment = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const tenantId = req.user.id;
    const payment = await paymentService.createPaymentIntoDB(tenantId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment created successfully",
        data: { payment },
    });
});
const confirmPayment = catchAsync(async (req, res) => {
    const { paymentId } = req.body;
    const payment = await paymentService.confirmPaymentIntoDB(paymentId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment confirmed successfully",
        data: { payment },
    });
});
//my payment 
const getMyPayments = catchAsync(async (req, res) => {
    const tenantId = req.user.id;
    const payments = await paymentService.getMyPaymentsFromDB(tenantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments fetched successfully",
        data: {
            payments,
        },
    });
});
//single payment
const getSinglePayment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.id;
    const payment = await paymentService.getSinglePaymentFromDB(id, tenantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment fetched successfully",
        data: {
            payment,
        },
    });
});
export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getSinglePayment,
};
//# sourceMappingURL=payment.controller.js.map