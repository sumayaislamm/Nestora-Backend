import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { rentalRequestService } from "./rentalRequest.service";
const createRentalRequest = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const tenantId = req.user.id;
    const rentalRequest = await rentalRequestService.createRentalRequestIntoDB(tenantId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request submitted successfully",
        data: { rentalRequest },
    });
});
const getRentalRequest = catchAsync(async (req, res, next) => {
    const tenantId = req.user.id;
    const rentals = await rentalRequestService.getAllRentalsFromDB(tenantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental Request fetched successfully",
        data: rentals,
    });
});
const getSingleRentalRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.id;
    const singleRental = await rentalRequestService.singleRentalIntoDB(id, tenantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request fetched successfully",
        data: { rentalRequest: singleRental },
    });
});
const getLandlordRequests = catchAsync(async (req, res) => {
    const landlordId = req.user.id;
    const requests = await rentalRequestService.getLandlordRequestsFromDB(landlordId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests fetched successfully",
        data: requests,
    });
});
const updateRentalStatus = catchAsync(async (req, res) => {
    const landlordId = req.user.id;
    const { id } = req.params;
    const rentalRequest = await rentalRequestService.updateRentalStatusIntoDB(id, landlordId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request updated successfully",
        data: { rentalRequest },
    });
});
export const rentalRequestController = {
    createRentalRequest,
    getRentalRequest,
    getSingleRentalRequest,
    getLandlordRequests,
    updateRentalStatus
};
//# sourceMappingURL=rentalRequest.controller.js.map