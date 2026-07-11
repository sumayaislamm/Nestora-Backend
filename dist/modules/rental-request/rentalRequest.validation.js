import { z } from "zod";
const createRentalRequestValidationSchema = z.object({
    body: z.object({
        propertyId: z.string().uuid("Invalid Property ID"),
        moveInDate: z.iso.datetime({
            error: "Move in date is required",
        }),
        message: z.string().optional(),
    }),
});
const updateRentalStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["APPROVED", "REJECTED"]),
    }),
});
export const RentalRequestValidation = {
    createRentalRequestValidationSchema,
    updateRentalStatusValidationSchema,
};
//# sourceMappingURL=rentalRequest.validation.js.map