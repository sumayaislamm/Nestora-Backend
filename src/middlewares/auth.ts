import { NextFunction, Request, Response } from "express";
import { Role, Status } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string,
                name: string,
                phone: string,
                profileImage: string,
                id: string,
                role: Role,
                status: Status,
            }
        }
    }
}

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ?
            req.cookies.accessToken
            :
            req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;

        if (!token) {
            throw new Error("You are not logged in, Please log in first!")
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_secret);


        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { email, name, id, role, status, phone, profileImage } = verifiedToken.data as JwtPayload;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden Permission, You don't have the permission!");
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id as string,
                name,
                email,
                role,
                phone,
                profileImage,
                status
            }
        });
        if (!user) {
            throw new Error("User Not Found!")
        }
        if (user.status === "BANNED") {
            throw new Error("Your account has been blocked, Please contact support.");
        };
        req.user = {
            id,
            name,
            email,
            role,
            phone,
            profileImage,
            status
        }
        next();

    })
}