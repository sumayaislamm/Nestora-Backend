import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.validation";

const router = Router();

router.post(
  "/categories",
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  categoryController.createCategory
);

router.get(
  "/categories",
  categoryController.getAllCategories
);



// router.patch(
//   "/categories/:id",
//   auth(Role.ADMIN),
//   validateRequest(CategoryValidation.updateCategoryValidationSchema),
//   categoryController.updateCategory
// );

export const categoryRouter = router;