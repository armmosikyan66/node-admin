import {Router} from "express";

export class Module {
    constructor(router: Router) {
    }
    protected assignRouter(): void {}
    protected assignEndpoints(): void {}
    public createEndpoints(): void {}
}

export interface IModules {
    [k: string]: typeof Module;
}