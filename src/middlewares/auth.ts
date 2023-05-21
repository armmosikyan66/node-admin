import {NextFunction, Request, Response} from "express";
import {REQUIRED} from "../config/constants";
import {AuthError} from "../config/errors";
import {IUser} from "../types/IUser";
import TokenRepo from "../repositories/token.repository";

interface IRequest extends Request {
    user?: IUser;
}

const tokenRepo = new TokenRepo();

const auth = {
    authMiddleware(req: IRequest, res: Response, next: NextFunction): void {
        try {
            const authHeaderContent: string | undefined = req.headers["authorization"];
            if (!authHeaderContent) {
                throw new Error(REQUIRED("Authorization Header "));
            }
            const token: string = authHeaderContent.split(" ")[1];
            req.user = tokenRepo.validateRefresh(token) as IUser;
            next();
        } catch (e) {
            let message = 'Unknown Error';

            if (e instanceof Error) message = e.message;

            next(new AuthError(message));
        }
    }
};

export default auth;