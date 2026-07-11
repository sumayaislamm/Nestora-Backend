import { Router } from "express";
import { userController } from "./user.controller.js";
import { Role } from "../../generated/prisma/enums.js";
import { auth } from "../../middlewares/auth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserValidation } from "./user.validation.js";
const router = Router();
// router.post("/register", userController.createUser);
router.post("/register", validateRequest(UserValidation.registerUserValidationSchema), userController.createUser);
router.get("/me", auth(Role.ADMIN, Role.LANDLORD, Role.TENANT), userController.getMyProfile);
router.patch("/my-profile", auth(Role.ADMIN, Role.LANDLORD, Role.TENANT), userController.updateMyProfile);
export const userRouter = router;
//# sourceMappingURL=user.route.js.map