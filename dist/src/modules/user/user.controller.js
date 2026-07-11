import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
const createUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    });
});
const getMyProfile = catchAsync(async (req, res, next) => {
    const profile = await userService.getMyProfileFromDB(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: { profile }
    });
});
const updateMyProfile = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const updatedProfile = await userService.updateMyProfileIntoDB(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Profile Updated Successfully!",
        data: { updatedProfile }
    });
});
export const userController = {
    createUser,
    getMyProfile,
    updateMyProfile
};
//# sourceMappingURL=user.controller.js.map