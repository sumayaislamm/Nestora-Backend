import { PaymentProvider, PaymentStatus } from "../../generated/prisma/enums.js";
export interface IPayment {
    rentalRequestId: string;
    provider: PaymentProvider;
}
export interface IPaymentUpdate {
    status?: PaymentStatus;
    transactionId?: string;
    paidAt?: Date;
}
export interface IConfirmPayment {
    paymentId: string;
}
//# sourceMappingURL=payment.interface.d.ts.map