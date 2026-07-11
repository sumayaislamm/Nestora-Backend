import { z } from "zod";
export declare const UserValidation: {
    registerUserValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            phone: z.ZodOptional<z.ZodString>;
            profileImage: z.ZodOptional<z.ZodString>;
            role: z.ZodEnum<{
                TENANT: "TENANT";
                LANDLORD: "LANDLORD";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map