import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { contactService } from "./contact.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createContactMessage = catchAsync(
  async (req: Request, res: Response) => {
    const result = await contactService.createContactMessage(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Your message has been sent successfully",
      data: result,
    });
  }
);

export const contactController = {
  createContactMessage,
};