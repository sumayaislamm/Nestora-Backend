import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";
const router = Router();
router.get("/admin/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch("/admin/users/:id", auth(Role.ADMIN), validateRequest(AdminValidation.updateUserStatusValidationSchema), adminController.updateUserStatus);
router.get("/admin/properties", auth(Role.ADMIN), adminController.getAllProperties);
router.get("/admin/rentals", auth(Role.ADMIN), adminController.getAllRentalRequests);
export const adminRoutes = router;
//# sourceMappingURL=admin.route.js.map