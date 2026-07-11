import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { reviewService } from "./review.service.js";


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

const getAllReviews = catchAsync(
  async (req: Request, res: Response) => {
    const reviews = await reviewService.getAllReviewsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews fetched successfully",
      data: { reviews },
    });
  }
);

export const reviewController = {
    createReview,
    getAllReviews
}