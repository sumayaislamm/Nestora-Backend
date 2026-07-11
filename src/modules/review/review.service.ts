import { NextFunction, Request, Response } from "express";
import { IReview } from "./review.interface";
import { prisma } from "../../lib/prisma";

const reviewCreateIntoDB = async (
    tenantId: string,
    payload: IReview
) => {
    const { propertyId, rating, comment } = payload;

    // tenant exist 
    const tenant = await prisma.user.findUnique({
        where: {
            id: tenantId,
        },
    });
    if (!tenant) {
        throw new Error("Tenant not found");
    }
    // if (property.landlordId === tenantId) {
    //     throw new Error("You cannot rent your own property");
    // }
    // Property Check 
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new Error("Property not found");
    }
    const rentalRequest = await prisma.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId,
            status: "ACTIVE",
        },
    });

    if (!rentalRequest) {
        throw new Error("You have not rented this property");
    }
    const payment = await prisma.payment.findFirst({
        where: {
            rentalRequestId: rentalRequest.id,
            status: "COMPLETED",
        },
    });

    if (!payment) {
        throw new Error("Payment not completed");
    }

    // duplicate review 
    const existingReview = await prisma.review.findFirst({
        where: {
            tenantId,
            propertyId,
        },
    });
    // validation 

    if (existingReview) {
        throw new Error("Review already submitted");
    }
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const review = await prisma.review.create({
        data: {
            tenantId,
            propertyId,
            rating,
            comment,
        },
        include: {
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            property: {
                include: {
                    category: true,
                },
            },
        },
    });

    return review;
}
const getAllReviewsFromDB = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        include: {
          category: true,
        },
      },
    },
  });

  return reviews;
};

export const reviewService = {
    reviewCreateIntoDB, 
    getAllReviewsFromDB
}



