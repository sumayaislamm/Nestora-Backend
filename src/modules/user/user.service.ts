import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { RegisterUserRequest } from "./user.interface";

const registerUserIntoDb = async (payload : RegisterUserRequest) => {
    const { name, email, password, phone, profileImage } = payload;
    const isUserExists = await prisma.user.findUnique({ where: { email } });
    if (isUserExists) {
        // return res.status(httpStatus.CONFLICT).json({
        //     success: false,
        //     message: "User already exists",
        // });
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
            profileImage

        },
        omit: {
            password: true,
        },

    })
    return user;
}

export const userService = {
    registerUserIntoDb,
};