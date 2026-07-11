import { z } from "zod";
const createPaymentValidationSchema = z.object({
    body: z.object({
        rentalRequestId: z.string().uuid("Invalid Rental Request ID"),
        provider: z.enum(["STRIPE", "SSLCOMMERZ"]),
    }),
});
const confirmPaymentValidationSchema = z.object({
    body: z.object({
        paymentId: z.string().uuid("Invalid Payment ID"),
        transactionId: z
            .string()
            .min(1, "Transaction ID is required"),
    }),
});
export const PaymentValidation = {
    createPaymentValidationSchema,
    confirmPaymentValidationSchema,
};
//# sourceMappingURL=payment.validation.js.map