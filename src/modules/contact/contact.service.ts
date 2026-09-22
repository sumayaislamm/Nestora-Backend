import { prisma } from "../../lib/prisma.js";
import { ICreateContactMessage } from "./contact.interface.js";

const createContactMessage = async (
  payload: ICreateContactMessage
) => {
  return await prisma.contactMessage.create({
    data: payload,
  });
};

export const contactService = {
  createContactMessage,
};