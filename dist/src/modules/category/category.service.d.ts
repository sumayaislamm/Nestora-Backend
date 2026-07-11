import { ICategory } from "./category.interface";
export declare const categoryService: {
    createCategoryIntoDB: (payload: ICategory) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCategoriesFromDB: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map