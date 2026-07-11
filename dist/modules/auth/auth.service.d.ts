import { ILoginUserRequest } from "./auth.interface";
export declare const authService: {
    loginUser: (payload: ILoginUserRequest) => Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map