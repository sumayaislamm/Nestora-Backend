import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../generated/prisma/enums.js";
import { propertyController } from "./property.controller.js";
import { PropertyValidation } from "./property.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
const router = Router();
router.post("/properties", auth(Role.LANDLORD), validateRequest(PropertyValidation.createPropertyValidationSchema), propertyController.createProperty);
router.patch("/properties/:id", auth(Role.LANDLORD), validateRequest(PropertyValidation.updatePropertyValidationSchema), propertyController.updateProperty);
router.get("/properties", propertyController.getAllProperties);
router.get("/properties/:id", propertyController.getSingleProperty);
router.delete("/properties/:id", auth(Role.LANDLORD), propertyController.deleteProperty);
export const propertyRoutes = router;
//# sourceMappingURL=property.route.js.map