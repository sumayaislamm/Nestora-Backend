import { Router } from "express";
import { contactController } from "./contact.controller.js";

const router = Router();

router.post("/", contactController.createContactMessage);

export const contactRouter = router;