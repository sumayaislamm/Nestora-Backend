import { z } from "zod";
export declare const PropertyValidation: {
    createPropertyValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
            location: z.ZodString;
            address: z.ZodString;
            rent: z.ZodNumber;
            bedrooms: z.ZodNumber;
            bathrooms: z.ZodNumber;
            size: z.ZodNumber;
            categoryId: z.ZodString;
            amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updatePropertyValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            rent: z.ZodOptional<z.ZodNumber>;
            bedrooms: z.ZodOptional<z.ZodNumber>;
            bathrooms: z.ZodOptional<z.ZodNumber>;
            size: z.ZodOptional<z.ZodNumber>;
            categoryId: z.ZodOptional<z.ZodString>;
            amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
            availability: z.ZodOptional<z.ZodEnum<{
                RENTED: "RENTED";
                AVAILABLE: "AVAILABLE";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=property.validation.d.ts.map