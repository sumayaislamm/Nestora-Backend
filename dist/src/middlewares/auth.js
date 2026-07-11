import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer")
                ? req.headers.authorization.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in. Please log in first!");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { id } = verifiedToken.data;
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new Error("User not found!");
        }
        if (user.status === "BANNED") {
            throw new Error("Your account has been blocked. Please contact support.");
        }
        if (requiredRoles.length &&
            !requiredRoles.includes(user.role)) {
            throw new Error("Forbidden! You don't have permission to access this resource.");
        }
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            profileImage: user.profileImage ?? "",
            role: user.role,
            status: user.status,
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map