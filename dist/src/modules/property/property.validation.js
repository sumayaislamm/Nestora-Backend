import { z } from "zod";
const createPropertyValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        location: z.string().min(1, "Location is required"),
        address: z.string().min(1, "Address is required"),
        rent: z
            .number({
            error: "Rent is required",
        })
            .positive("Rent must be greater than 0"),
        bedrooms: z
            .number()
            .int()
            .min(1, "Bedrooms must be at least 1"),
        bathrooms: z
            .number()
            .int()
            .min(1, "Bathrooms must be at least 1"),
        size: z
            .number()
            .positive("Size must be greater than 0"),
        categoryId: z.string().uuid("Invalid Category ID"),
        amenities: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
    }),
});
const updatePropertyValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        address: z.string().optional(),
        rent: z.number().positive().optional(),
        bedrooms: z.number().int().optional(),
        bathrooms: z.number().int().optional(),
        size: z.number().positive().optional(),
        categoryId: z.string().uuid().optional(),
        amenities: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
        availability: z
            .enum(["AVAILABLE", "RENTED"])
            .optional(),
    }),
});
export const PropertyValidation = {
    createPropertyValidationSchema,
    updatePropertyValidationSchema,
};
//# sourceMappingURL=property.validation.js.map