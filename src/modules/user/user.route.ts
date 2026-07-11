import { Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

// router.post("/register", userController.createUser);

router.post(
  "/register",
  validateRequest(UserValidation.registerUserValidationSchema),
  userController.createUser
);

router.get("/me",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
    userController.getMyProfile);

router.patch("/my-profile", auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
userController.updateMyProfile);

export const userRouter = router;