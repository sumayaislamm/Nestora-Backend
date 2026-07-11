import { z } from "zod";
export declare const AdminValidation: {
    updateUserStatusValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                ACTIVE: "ACTIVE";
                BANNED: "BANNED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=admin.validation.d.ts.map