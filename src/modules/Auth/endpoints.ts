import {Router} from "express";
import middlewares from "../../middlewares";
import schemas from "./schemas";
import authController from "./auth.controller";

export default (router: Router): void => {
    router.post("/register", ...middlewares(schemas, "register"), authController.register);
    router.post("/login", ...middlewares(schemas, "login"), authController.login);
    router.get("/refresh", ...middlewares(schemas, "checkAuth"), authController.refresh);
    router.get("/logout", ...middlewares(schemas, "checkAuth"), authController.logout);
}