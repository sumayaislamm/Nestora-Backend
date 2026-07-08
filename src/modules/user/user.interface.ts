export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileImage?: string;
}

