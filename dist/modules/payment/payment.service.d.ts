import { IPayment } from "./payment.interface";
export declare const paymentService: {
    createPaymentIntoDB: (tenantId: string, payload: IPayment) => Promise<{
        payment: any;
        checkoutUrl: string | null;
    }>;
    confirmPaymentIntoDB: (paymentId: string) => Promise<any>;
    getMyPaymentsFromDB: (tenantId: string) => Promise<any>;
    getSinglePaymentFromDB: (paymentId: string, tenantId: string) => Promise<any>;
};
//# sourceMappingURL=payment.service.d.ts.map