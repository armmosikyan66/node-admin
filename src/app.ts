import cors from "cors";
import bodyParser from "body-parser";
import express, {Router} from "express";
import cookieParser from "cookie-parser";

import corsOptions from "./config/cors";
import errorHandler from "./middlewares/errorhandler";
import modules from "./modules";
import path from "path";
import {rootPath} from "./config";

export default class App {
    public app;
    private router!: Router;

    constructor() {
        this.app = express();
        this.configApp();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
    }

    private configApp() {
        this.app
            .use(cors(corsOptions))
            .use(cookieParser())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .use("/css", express.static(path.join(rootPath, "public", "admin", "css")))
            .use("/assets", express.static(path.join(rootPath, "public", "admin", "assets")))
            .use("/js", express.static(path.join(rootPath, "public", "admin", "js")));
    }

    private setRouter() {
        this.router = Router();
        this.app.use(this.router);
    }

    private async enableModules() {
        await modules(this.router);
    }

    private setErrorHandler() {
       this.app.use(errorHandler);
    }
}
