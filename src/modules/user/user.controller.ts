import { NextFunction, Request,  Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";




const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    });
});

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const {accessToken} = req.cookies;
          console.log(accessToken);
          const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_secret) as JwtPayload;

        const profile  = await userService.getMyProfileFromDB (verifiedToken.id as string);

        sendResponse(res , {
            success: true, 
            statusCode: httpStatus.OK,
            message: "User profile fetched successfully",
            data: {profile}

        })
         

});
export const userController = {
    createUser,
    getMyProfile, 
};