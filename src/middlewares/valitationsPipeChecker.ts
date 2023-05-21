import { validationResult } from "express-validator";
import { VALIDATION_ERROR_CODE } from "../config/statusCodes";
import {NextFunction, Request, Response} from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }

    next();
};
