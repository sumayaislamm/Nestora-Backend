import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { prisma } from "./lib/prisma";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { categoryRouter } from "./modules/category/category.route";

const app: Application = express();


// Middleware 
app.use(cors({
    origin: config.app_url,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Sumu!");
});

app.use("/api/auth", userRouter);
app.use("/api", authRouter);

//Category 
app.use("/api", categoryRouter);


export default app;


// httpStatus.OK                  // 200
// httpStatus.CREATED             // 201
// httpStatus.BAD_REQUEST         // 400
// httpStatus.UNAUTHORIZED        // 401
// httpStatus.FORBIDDEN           // 403
// httpStatus.NOT_FOUND           // 404
// httpStatus.CONFLICT            // 409
// httpStatus.INTERNAL_SERVER_ERROR // 500