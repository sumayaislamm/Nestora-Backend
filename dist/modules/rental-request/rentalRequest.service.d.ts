import { IRentalRequest } from "./rentalRequest.interface";
import { RequestStatus } from "../../../generated/prisma/enums";
export declare const rentalRequestService: {
    createRentalRequestIntoDB: (tenantId: string, payload: IRentalRequest) => Promise<any>;
    getAllRentalsFromDB: (tenantId: string) => Promise<any>;
    singleRentalIntoDB: (rentalId: string, tenantId: string) => Promise<any>;
    getLandlordRequestsFromDB: (landlordId: string) => Promise<any>;
    updateRentalStatusIntoDB: (rentalRequestId: string, landlordId: string, payload: {
        status: RequestStatus;
    }) => Promise<any>;
};
//# sourceMappingURL=rentalRequest.service.d.ts.map