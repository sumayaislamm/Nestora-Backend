import { NextFunction, Request, Response } from "express";
import { Role, Status } from "../generated/prisma/enums.js";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                phone: string;
                profileImage: string;
                role: Role;
                status: Status;
            };
        }
    }
}
export declare const auth: (...requiredRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map