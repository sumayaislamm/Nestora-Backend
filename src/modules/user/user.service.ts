import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { RegisterUserRequest } from "./user.interface";
import { Role, Status } from "../../../generated/prisma/enums";

const registerUserIntoDb = async (payload: RegisterUserRequest) => {
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
            phone,
            profileImage,
            role,
            status: Status.ACTIVE,
        },
        omit: {
            password: true,
        },

    })
    return user;
}

const getMyProfileFromDB = async (userId: string) => {
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
}

const updateMyProfileIntoDB = async (userId: string, payload: any) => {

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
    })

    return updatedUser;


}
export const userService = {
    registerUserIntoDb,
    getMyProfileFromDB,
    updateMyProfileIntoDB
};