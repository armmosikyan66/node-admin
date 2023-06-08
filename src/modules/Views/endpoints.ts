import {Router, Request, Response} from "express";
import * as path from "path";
import {rootPath} from "../../config";

export default (router: Router): void => {
    router.get("/login(.html)?", (req: Request, res: Response) => res.sendFile(path.join(rootPath, "public", "admin", "pages", "login.html")));
    router.get("/registration(.html)?", (req: Request, res: Response) => res.sendFile(path.join(rootPath, "public", "admin", "pages", "register.html")));
    router.get("/", (req: Request, res: Response) => res.sendFile(path.join(rootPath, "public", "admin", "index.html")));
    router.get("/users(.html)?", (req: Request, res: Response) => res.sendFile(path.join(rootPath, "public", "admin", "pages", "users.html")));
};
