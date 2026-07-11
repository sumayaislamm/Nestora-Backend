import { z } from "zod";
const loginValidationSchema = z.object({
    body: z.object({
        email: z
            .string({
            error: "Email is required",
        })
            .email("Invalid email format"),
        password: z
            .string({
            error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters"),
    }),
});
export const AuthValidation = {
    loginValidationSchema,
};
//# sourceMappingURL=auth.validation.js.map