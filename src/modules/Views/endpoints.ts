import {Router, Request, Response} from "express";
import * as path from "path";
import {rootPath} from "../../config";

export default (router: Router): void => {
    router.get("/login(.html)?", (req: Request, res: Response) => res.sendFile(path.join(rootPath, "public", "admin", "pages", "login.html")));
};
