import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";


const createReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const tenantId = req.user!.id as string;

        const review = await reviewService.reviewCreateIntoDB(
            tenantId,
            payload
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Review created successfully",
            data: { review },
        });
    }
);

export const reviewController = {
    createReview
}