import { Router } from "express"
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/payments/create",
    auth(Role.TENANT),
    paymentController.createPayment );

router.post(
    "/payments/confirm",
    auth(Role.TENANT),
    paymentController.confirmPayment
);

export const paymentRouter = router;