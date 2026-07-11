import { ILoginUserRequest } from "./auth.interface";
export declare const authService: {
    loginUser: (payload: ILoginUserRequest) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map