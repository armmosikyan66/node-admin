import { NextFunction, Response, Request } from "express";
import { ServiceUnavailable } from "../config/errors";
import { BAD_REQUEST_CODE } from "../config/statusCodes";
import {IError} from "../types/IError";

export default async (err: IError, req: Request, res: Response, next: NextFunction):  Promise<Response> => {
    if (!err.status) {
        next(new ServiceUnavailable(err.message));
    }

    const status: number = err.status || BAD_REQUEST_CODE;

    return res.status(status).json({
        status: status,
        message: err.message || "",
        errors: err.errors || null,
        body: req.body
    });
};