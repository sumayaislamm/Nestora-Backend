import { NextFunction, Request, Response } from "express";
export declare const paymentController: {
    createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSinglePayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map