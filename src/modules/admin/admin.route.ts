import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.get(
    "/admin/users",
    auth(Role.ADMIN),
    adminController.getAllUsers
);

router.patch(
    "/admin/users/:id",
    auth(Role.ADMIN),
    adminController.updateUserStatus
);

router.get(
    "/admin/properties",
    auth(Role.ADMIN),
    adminController.getAllProperties
);


router.get(
  "/admin/rentals",
  auth(Role.ADMIN),
  adminController.getAllRentalRequests
);
export const adminRoutes = router;