import config from "../../config";
import { prisma } from "../../lib/prisma";
import { ILoginUserRequest } from "./auth.interface";
import bcrypt from "bcryptjs";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";


const loginUser = async (payload: ILoginUserRequest) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email },

    });
    if (user.status === "BANNED") {
        throw new Error("Your account has been blocked, Please contact support.")
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid user password");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        status: user.status,
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_secret, config.jwt_access_expires_in as SignOptions);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);
    return {
        accessToken,
        refreshToken,
    };
};

export const authService = {
    loginUser,
};