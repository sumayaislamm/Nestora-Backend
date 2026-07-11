import { NextFunction, Request, Response } from "express";
export declare const rentalRequestController: {
    createRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getLandlordRequests: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRentalStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=rentalRequest.controller.d.ts.map