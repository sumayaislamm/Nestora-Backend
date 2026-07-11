import { Router } from "express";
import { authController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
const router = Router();
router.post("/auth/login", validateRequest(AuthValidation.loginValidationSchema), authController.loginUser);
export const authRouter = router;
//# sourceMappingURL=auth.route.js.map