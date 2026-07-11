import { Role } from "../../../generated/prisma/enums";
export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileImage?: string;
    role: Role;
}
//# sourceMappingURL=user.interface.d.ts.map