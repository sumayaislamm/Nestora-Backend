import { IProperty } from "./property.interface";
export declare const propertyService: {
    createPropertyIntoDB: (landlordId: string, payload: IProperty) => Promise<any>;
    getAllPropertiesFromDB: (query: Record<string, any>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: any;
        };
        data: any;
    }>;
    updatePropertyIntoDB: (propertyId: string, landlordId: string, payload: Partial<IProperty>) => Promise<any>;
    getSinglePropertyFromDB: (propertyId: string) => Promise<any>;
    deletePropertyFromDB: (propertyId: string, landlordId: string) => Promise<void>;
};
//# sourceMappingURL=property.service.d.ts.map