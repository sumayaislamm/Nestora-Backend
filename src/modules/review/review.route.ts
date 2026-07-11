import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../generated/prisma/enums.js";
import { reviewController } from "./review.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { ReviewValidation } from "./review.validation.js";

const router = Router();

router.post(
  "/reviews",
  auth(Role.TENANT),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  reviewController.createReview
);


router.get(
  "/reviews",
  reviewController.getAllReviews
);

export const reviewRoutes = router;