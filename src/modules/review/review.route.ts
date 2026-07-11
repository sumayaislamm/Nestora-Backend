import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = Router();

router.post(
  "/reviews",
  auth(Role.TENANT),
  reviewController.createReview
);

router.get(
  "/reviews",
  reviewController.getAllReviews
);

export const reviewRoutes = router;