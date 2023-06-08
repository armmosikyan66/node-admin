import {NextFunction, Request, Response} from "express";
import {NOT_EXISTS, REQUIRED} from "../config/constants";
import {AuthError, NotFound} from "../config/errors";
import {IUser} from "../types/IUser";
import TokenRepo from "../repositories/token.repository";
import UserRepository from "../repositories/user.repository";

export interface IRequestWithUser extends Request {
    user?: IUser;
}

const tokenRepo = new TokenRepo();
const userRepo = new UserRepository();

const auth = {
    authMiddleware(req: IRequestWithUser, res: Response, next: NextFunction): void {
        try {
            const authHeaderContent: string | undefined = req.headers["authorization"];
            if (!authHeaderContent) {
                throw new Error(REQUIRED("Authorization Header "));
            }
            const token: string = authHeaderContent.split(" ")[1];
            const user = tokenRepo.validateRefresh(token) as IUser;

            userRepo.findOne({_id: user._id}).then(cond => {
                if (!cond) {
                    throw new NotFound(NOT_EXISTS("User"));
                }
                tokenRepo.findOne({user: cond.id}).then(res => {
                    if (!res) {
                        throw new NotFound(NOT_EXISTS("User"));
                    }
                    req.user = cond;
                    next();
                })
            });
        } catch (e) {
            let message = 'Unknown Error';

            if (e instanceof Error) message = e.message;

            next(new AuthError(message));
        }
    }
};

export default auth;