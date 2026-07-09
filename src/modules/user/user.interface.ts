import { Role, Status } from "../../../generated/prisma/enums";

export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileImage?: string;
    role: Role;
    status: Status;
}

