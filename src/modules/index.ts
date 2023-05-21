import * as fs from "fs";
import {Router} from "express";
import {IModules} from "../types/IModules";


let fileNames: string[] = fs.readdirSync(`${__dirname}`);
fileNames = fileNames.filter(fileName => fileName !== "index.ts");

const importCreator = async (dirs: string[]): Promise<IModules> => {
    const temp: IModules = {};
    for (const dir of dirs) {
        temp[`${dir}`] = (await import(`./${dir}`)).default;
    }

    return temp;
};

export default async (router: Router): Promise<void> => {
    const imports: IModules = await importCreator(fileNames);

    Object.keys(imports).map((key: string) => {
        return new imports[key](router).createEndpoints();
    });
};
