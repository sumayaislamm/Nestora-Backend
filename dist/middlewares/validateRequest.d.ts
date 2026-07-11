import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const validateRequest: (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map