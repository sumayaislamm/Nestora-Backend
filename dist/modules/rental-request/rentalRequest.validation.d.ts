import { z } from "zod";
export declare const RentalRequestValidation: {
    createRentalRequestValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            propertyId: z.ZodString;
            moveInDate: z.ZodISODateTime;
            message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateRentalStatusValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                APPROVED: "APPROVED";
                REJECTED: "REJECTED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=rentalRequest.validation.d.ts.map