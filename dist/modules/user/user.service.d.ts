import { RegisterUserRequest } from "./user.interface";
export declare const userService: {
    registerUserIntoDb: (payload: RegisterUserRequest) => Promise<any>;
    getMyProfileFromDB: (userId: string) => Promise<any>;
    updateMyProfileIntoDB: (userId: string, payload: any) => Promise<any>;
};
//# sourceMappingURL=user.service.d.ts.map