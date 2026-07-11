import { Router } from "express";
import { paymentController } from "./payment.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../generated/prisma/enums.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { PaymentValidation } from "./payment.validation.js";
const router = Router();
router.post("/payments/create", auth(Role.TENANT), validateRequest(PaymentValidation.createPaymentValidationSchema), paymentController.createPayment);
router.post("/payments/confirm", auth(Role.TENANT), validateRequest(PaymentValidation.confirmPaymentValidationSchema), paymentController.confirmPayment);
router.get("/payments", auth(Role.TENANT), paymentController.getMyPayments);
router.get("/payments/:id", auth(Role.TENANT), paymentController.getSinglePayment);
export const paymentRouter = router;
//# sourceMappingURL=payment.route.js.map