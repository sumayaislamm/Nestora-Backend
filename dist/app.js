import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import { categoryRouter } from "./modules/category/category.route.js";
import { propertyRoutes } from "./modules/property/property.route.js";
import { rentalRoute } from "./modules/rental-request/rentalRequest.route.js";
import { paymentRouter } from "./modules/payment/payment.route.js";
import { reviewRoutes } from "./modules/review/review.route.js";
import { adminRoutes } from "./modules/admin/admin.route.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
const app = express();
// Middleware 
// app.use(cors({
//     origin: config.app_url,
//     credentials: true
// }));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello Sumu!");
});
app.use("/api/auth", userRouter);
app.use("/api", authRouter);
//Category 
app.use("/api", categoryRouter);
//Property
app.use("/api", propertyRoutes);
// Rental 
app.use("/api", rentalRoute);
//payment 
app.use("/api", paymentRouter);
//review
app.use("/api", reviewRoutes);
//admin
app.use("/api", adminRoutes);
//404
app.use(notFound);
// global error 
app.use(globalErrorHandler);
export default app;
// httpStatus.OK                  // 200
// httpStatus.CREATED             // 201
// httpStatus.BAD_REQUEST         // 400
// httpStatus.UNAUTHORIZED        // 401
// httpStatus.FORBIDDEN           // 403
// httpStatus.NOT_FOUND           // 404
// httpStatus.CONFLICT            // 409
// httpStatus.INTERNAL_SERVER_ERROR // 500
//# sourceMappingURL=app.js.map