import { IProperty } from "./property.interface";
import { prisma } from "../../lib/prisma";

// Create 
const createPropertyIntoDB = async (
    landlordId: string,
    payload: IProperty
) => {

    const { title, description, location, address, rent, bedrooms, bathrooms, size, amenities, images, categoryId } = payload;

    // Category Check 
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });

    if (!category) {
        throw new Error("Category not found");
    }
    // Landlord check 
    const landlord = await prisma.user.findUnique({
        where: {
            id: landlordId,
        },
    });

    if (!landlord) {
        throw new Error("Landlord not found");
    }
    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            address,
            rent,
            bedrooms,
            bathrooms,
            size,
            amenities,
            images,
            landlordId,
            categoryId
        },
        include: {
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            category: true,
        },
    });
    return property;
}

// See All Category 
const getAllPropertiesFromDB = async () => {
    const properties = await prisma.property.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    profileImage: true,
                },
            },
            category: true,
        },
    });

    return properties;
};

// See single category 
const getSinglePropertyFromDB = async (
    propertyId: string
) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: { id: propertyId },
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    profileImage: true,
                    role: true,
                }
            }
        }
    });
     if (!property) {
    throw new Error("Property not found");
  }
    return property;

}

// Update 
const updatePropertyIntoDB = async (
    propertyId: string,
    landlordId: string,
    payload: Partial<IProperty>
) => {


    const property = await prisma.property.findUnique({
        where: { id: propertyId },
    });

    if (!property) {
        throw new Error("Property not found");
    }


    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }


    if (payload.categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: payload.categoryId },
        });

        if (!category) {
            throw new Error("Category not found");
        }
    }


    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            ...payload,
        },
        include: {
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            category: true,
        },
    });

    return updatedProperty;
};

// delete
const deletePropertyFromDB = async (
    propertyId: string,
    landlordId: string
) => {

    const property = await prisma.property.findUnique({
        where: { id: propertyId },
    });

    if (!property) {
        throw new Error("Property not found");
    }


    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to delete this property");
    }

    const deleteProperty = await prisma.property.delete({
         where: {
            id: propertyId,
        }
    })
}

export const propertyService = {
    createPropertyIntoDB,
    getAllPropertiesFromDB,
    updatePropertyIntoDB,
    getSinglePropertyFromDB,
    deletePropertyFromDB

}