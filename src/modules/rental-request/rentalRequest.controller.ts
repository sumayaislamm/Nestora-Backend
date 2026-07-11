import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { rentalRequestService } from "./rentalRequest.service.js";

const createRentalRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const tenantId = req.user!.id as string;

        const rentalRequest = await rentalRequestService.createRentalRequestIntoDB(
            tenantId,
            payload
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Rental request submitted successfully",
            data: { rentalRequest },
        });
    }
)

const getRentalRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tenantId = req.user!.id;
        const rentals = await rentalRequestService.getAllRentalsFromDB(tenantId);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental Request fetched successfully",
            data: rentals,
        });
    }
)

const getSingleRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenantId = req.user!.id;

    const singleRental = await rentalRequestService.singleRentalIntoDB(
      id as string,
      tenantId
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental request fetched successfully",
      data: { rentalRequest: singleRental },
    });
  }
);

const getLandlordRequests = catchAsync(
  async (req: Request, res: Response) => {
    const landlordId = req.user!.id;

    const requests = await rentalRequestService.getLandlordRequestsFromDB(
      landlordId
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental requests fetched successfully",
      data: requests,
    });
  }
);

const updateRentalStatus = catchAsync(
  async (req: Request, res: Response) => {
    const landlordId = req.user!.id;
    const { id } = req.params;

    const rentalRequest = await rentalRequestService.updateRentalStatusIntoDB(
      id as string,
      landlordId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental request updated successfully",
      data: { rentalRequest },
    });
  }
);



export const rentalRequestController = {
    createRentalRequest,
    getRentalRequest,
    getSingleRentalRequest,
    getLandlordRequests,
    updateRentalStatus 

}