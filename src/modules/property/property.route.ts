import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { propertyController } from "./property.controller";
import { PropertyValidation } from "./property.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/properties",
  auth(Role.LANDLORD),
  validateRequest(PropertyValidation.createPropertyValidationSchema),
  propertyController.createProperty
);



router.patch(
  "/properties/:id",
  auth(Role.LANDLORD),
  validateRequest(PropertyValidation.updatePropertyValidationSchema),
  propertyController.updateProperty
);

router.get(
  "/properties",
  propertyController.getAllProperties
);

router.get(
  "/properties/:id",
  propertyController.getSingleProperty
);



router.delete(
  "/properties/:id",
  auth(Role.LANDLORD),
  propertyController.deleteProperty
);

export const propertyRoutes = router;