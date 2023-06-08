import userService from "./user.service";
import {SUCCESS_CODE} from "../../config/statusCodes";
import {NextFunction, Response, Request} from "express";

export type Query = { search: string, sort: string }

class User {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {page, show} = req.params;
            const query = req.query;
            const filter = req.body;

            const users = await userService.getUsers(Number(page), Number(show), query as Query, filter);

            res.status(SUCCESS_CODE).json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default User;
