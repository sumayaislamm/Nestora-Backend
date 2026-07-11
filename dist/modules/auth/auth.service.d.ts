import { ILoginUserRequest } from "./auth.interface.js";
export declare const authService: {
    loginUser: (payload: ILoginUserRequest) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map