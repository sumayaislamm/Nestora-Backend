import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";
const router = Router();
router.post("/reviews", auth(Role.TENANT), validateRequest(ReviewValidation.createReviewValidationSchema), reviewController.createReview);
router.get("/reviews", reviewController.getAllReviews);
export const reviewRoutes = router;
//# sourceMappingURL=review.route.js.map