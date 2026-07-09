import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();

router.post(
  "/categories",
  auth(Role.ADMIN),
  categoryController.createCategory
);

router.get(
  "/categories",
  categoryController.getAllCategories
);

export const categoryRouter = router;