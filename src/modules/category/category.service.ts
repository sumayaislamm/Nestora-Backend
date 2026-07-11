import { prisma } from "../../lib/prisma.js";
import { ICategory } from "./category.interface.js";

const createCategoryIntoDB = async (payload: ICategory) => {
  const { name } = payload;
  // Case Sensetive 
  const formattedName =
    name.trim().charAt(0).toUpperCase() +
    name.trim().slice(1).toLowerCase();
    
  // Check Already created category 
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      name: formattedName,
    },
  });

  if (isCategoryExists) {
    throw new Error("Category already exists");
  }
  // create category 
  const category = await prisma.category.create({
    data: {
      name,
    }
  });
  return category;
};
// See All Category 
const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB

}
