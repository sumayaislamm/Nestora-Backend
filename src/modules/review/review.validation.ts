import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid("Invalid Property ID"),

    rating: z
      .number({
        error: "Rating is required",
      })
      .int()
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5"),

    comment: z
      .string()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};