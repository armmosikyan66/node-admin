import { Router } from "express";
import ViewsEndpoints from "./endpoints";
import {Module} from "../../types/IModules";

export default class ViewsModule extends Module {
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
        this.apiRouter.use("/admin", this.router);
    }

    protected assignEndpoints(): void {
        ViewsEndpoints(this.router);
    }
}
