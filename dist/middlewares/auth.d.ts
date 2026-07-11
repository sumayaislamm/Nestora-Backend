import { Role, Status } from "../../generated/prisma/enums";
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
export declare const auth: (...requiredRoles: Role[]) => any;
//# sourceMappingURL=auth.d.ts.map