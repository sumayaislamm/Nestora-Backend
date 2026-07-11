import { ZodError } from "zod";
export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errorDetails: err.issues,
        });
    }
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        errorDetails: err,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map