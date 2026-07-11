import { IReview } from "./review.interface";
export declare const reviewService: {
    reviewCreateIntoDB: (tenantId: string, payload: IReview) => Promise<any>;
    getAllReviewsFromDB: () => Promise<any>;
};
//# sourceMappingURL=review.service.d.ts.map