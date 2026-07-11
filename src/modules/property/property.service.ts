import { IProperty } from "./property.interface.js";
import { prisma } from "../../lib/prisma.js";


// Create 
const createPropertyIntoDB = async (
    landlordId: string,
    payload: IProperty
) => {

    const { title, description, location, address, rent, bedrooms, bathrooms, size, availability, amenities, images, categoryId } = payload;


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
            availability,
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
const getAllPropertiesFromDB = async (query: Record<string, any>) => {
    const {
        search,
        categoryId,
        availability,
        bedrooms,
        minRent,
        maxRent,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = query;
    const where: any = {};
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                location: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                address: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    if (availability) {
        where.availability = availability;
    }
    if (bedrooms) {
        where.bedrooms = Number(bedrooms);
    }
    if (minRent || maxRent) {
        where.rent = {};

        if (minRent) {
            where.rent.gte = Number(minRent);
        }

        if (maxRent) {
            where.rent.lte = Number(maxRent);
        }
    }
    const skip = (Number(page) - 1) * Number(limit);
    

    const properties = await prisma.property.findMany({
        where,
        skip,
        take: Number(limit),

        orderBy: {
            [sortBy]: sortOrder,
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
    const total = await prisma.property.count({
        where,
    });
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: properties,
    };
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

     await prisma.property.delete({
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