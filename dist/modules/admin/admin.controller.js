import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status";
import { adminService } from "./admin.service.js";
const getAllUsers = catchAsync(async (req, res) => {
    const users = await adminService.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users fetched successfully",
        data: { users },
    });
});
const updateUserStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateUserStatusIntoDB(id, req.body.status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: { user: result },
    });
});
const getAllProperties = catchAsync(async (req, res) => {
    const properties = await adminService.getAllPropertiesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All properties fetched successfully",
        data: { properties },
    });
});
const getAllRentalRequests = catchAsync(async (req, res) => {
    const rentals = await adminService.getAllRentalRequestsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All rental requests fetched successfully",
        data: { rentals },
    });
});
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
};
//# sourceMappingURL=admin.controller.js.map