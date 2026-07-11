import { Router } from "express";
import { authController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post("/auth/login",validateRequest(AuthValidation.loginValidationSchema), authController.loginUser);


export const authRouter = router;