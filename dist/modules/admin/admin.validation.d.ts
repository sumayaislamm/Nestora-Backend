import { z } from "zod";
export declare const AdminValidation: {
    updateUserStatusValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                BANNED: "BANNED";
                ACTIVE: "ACTIVE";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=admin.validation.d.ts.map