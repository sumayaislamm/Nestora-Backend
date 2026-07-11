import { Status } from "../../../generated/prisma/enums";
export declare const adminService: {
    getAllUsersFromDB: () => Promise<any>;
    updateUserStatusIntoDB: (userId: string, status: Status) => Promise<any>;
    getAllPropertiesFromDB: () => Promise<any>;
    getAllRentalRequestsFromDB: () => Promise<any>;
};
//# sourceMappingURL=admin.service.d.ts.map