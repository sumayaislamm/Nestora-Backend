import { prisma } from "../../lib/prisma.js";
import config from "../../config/index.js";
import bcrypt from "bcryptjs";
import { Role, Status } from "../../generated/prisma/enums.js";
const registerUserIntoDb = async (payload) => {
    const { name, email, password, phone, profileImage, role } = payload;
    const isUserExists = await prisma.user.findUnique({ where: { email } });
    if (isUserExists) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    if (role === Role.ADMIN) {
        throw new Error("Admin registration is not allowed");
    }
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone: phone ?? null,
            profileImage: profileImage ?? null,
            role,
            status: Status.ACTIVE,
        },
        omit: {
            password: true,
        },
    });
    return user;
};
const getMyProfileFromDB = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        omit: {
            password: true
        },
        include: {
            properties: true
        }
    });
    return user;
};
const updateMyProfileIntoDB = async (userId, payload) => {
    const { name, email, phone, profileImage } = payload;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            phone,
            profileImage
        },
        omit: {
            password: true
        }
    });
    return updatedUser;
};
export const userService = {
    registerUserIntoDb,
    getMyProfileFromDB,
    updateMyProfileIntoDB
};
//# sourceMappingURL=user.service.js.map