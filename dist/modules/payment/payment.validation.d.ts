import { z } from "zod";
export declare const PaymentValidation: {
    createPaymentValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            rentalRequestId: z.ZodString;
            provider: z.ZodEnum<{
                STRIPE: "STRIPE";
                SSLCOMMERZ: "SSLCOMMERZ";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    confirmPaymentValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            paymentId: z.ZodString;
            transactionId: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=payment.validation.d.ts.map