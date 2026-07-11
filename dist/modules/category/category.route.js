import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../generated/prisma/enums.js";
import { categoryController } from "./category.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { CategoryValidation } from "./category.validation.js";
const router = Router();
router.post("/categories", auth(Role.ADMIN), validateRequest(CategoryValidation.createCategoryValidationSchema), categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
// router.patch(
//   "/categories/:id",
//   auth(Role.ADMIN),
//   validateRequest(CategoryValidation.updateCategoryValidationSchema),
//   categoryController.updateCategory
// );
export const categoryRouter = router;
//# sourceMappingURL=category.route.js.map