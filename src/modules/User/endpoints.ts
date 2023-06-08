import UserController from "./user.controller";
import {Router} from "express";

const userController = new UserController();

export default (router: Router) => {
    router.post("/get-users/:show/:page", userController.getUsers);
};
