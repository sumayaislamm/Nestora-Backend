import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


// router.post("/rental-request", rentalRequestController.createRentalRequest);

router.post(
    "/rentals",
    auth(Role.TENANT),
    rentalRequestController.createRentalRequest
);

router.get(
    "/rentals",
    auth(Role.TENANT),
    rentalRequestController.getRentalRequest
);

router.get(
    "/rentals/:id",
    auth(Role.TENANT),
    rentalRequestController.getSingleRentalRequest
);

// Landlord
router.get(
    "/landlord/requests",
    auth(Role.LANDLORD),
    rentalRequestController.getLandlordRequests
);

router.patch(
    "/landlord/requests/:id",
    auth(Role.LANDLORD),
    rentalRequestController.updateRentalStatus
);

export const rentalRoute = router;
