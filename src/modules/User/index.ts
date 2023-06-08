import UserEndpoints from "./endpoints";
import {Router} from "express";
import {Module} from "../../types/IModules";

export default class UserModule extends Module {
    private router: Router;
    private apiRouter: Router;

    constructor(apiRouter: Router) {
        super(apiRouter);
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    public createEndpoints(): void {
        this.assignRouter();
        this.assignEndpoints();
    }

    protected assignRouter(): void {
        this.apiRouter.use("/api", this.router);
    }

    protected assignEndpoints(): void {
        UserEndpoints(this.router);
    }
}

