import { z } from "zod";

const registerUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().optional(),
        profileImage: z.string().optional(),
        role: z.enum(["TENANT", "LANDLORD"]),
    }),
});

export const UserValidation = {
    registerUserValidationSchema,
};