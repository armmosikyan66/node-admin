import {checkSchema, Schema} from "express-validator";
import {DefaultSchemaKeys} from "express-validator/src/middlewares/schema";
import validationsPipeChecker from "./valitationsPipeChecker";
import auth from "./auth.js";

interface ISchemas {
    [k: string]: {
        authentication?: boolean;
        validationPipe: Schema<DefaultSchemaKeys>
    }
}

export default (schemas: ISchemas, actionName: string) => {
    const middlewares = [];

    if (!schemas[actionName]) return [];

    if (schemas[actionName].authentication) {
        middlewares.push(auth.authMiddleware);
    }

    if (schemas[actionName].validationPipe) {
        middlewares.push(checkSchema(schemas[actionName].validationPipe));
        middlewares.push(validationsPipeChecker);
    }

    return middlewares;
};
