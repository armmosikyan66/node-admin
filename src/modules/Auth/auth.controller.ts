import {NextFunction, Request, Response} from "express";
import {CREATED_CODE, SUCCESS_CODE} from "../../config/statusCodes";
import AuthService from "./auth.service";
import {IRequestWithUser} from "../../middlewares/auth";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password, phoneNumber, firstName, lastName, role} = req.body;
            const user = await AuthService.registration(email, password, phoneNumber, firstName, lastName, role);

            res.status(CREATED_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }

    async login (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;
            const user = await AuthService.login(email, password);

            res.cookie("refreshToken", user.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            });
            res.redirect('/admin');
            res.status(SUCCESS_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user;

            const updatedUser = await AuthService.refresh(user);

            res.cookie("refreshToken", updatedUser.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            });

            res.status(SUCCESS_CODE).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user;

            const updatedUser = await AuthService.logout(user)

            res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
            res.redirect('/admin/login');
            res.status(SUCCESS_CODE).json(updatedUser)
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();