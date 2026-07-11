import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import { jwtUtils } from "../../utils/jwt.js";
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email },
    });
    if (user.status === "BANNED") {
        throw new Error("Your account has been blocked, Please contact support.");
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
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
export const authService = {
    loginUser,
};
//# sourceMappingURL=auth.service.js.map