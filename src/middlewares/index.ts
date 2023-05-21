import {checkSchema, Schema} from "express-validator";
import {DefaultSchemaKeys} from "express-validator/src/middlewares/schema";
import validationsPipeChecker from "./valitationsPipeChecker";
import auth from "./auth";

type SchemaObject = {
    [actionName: string]: {
        authentication?: boolean;
        validationPipe?: Record<string, unknown>;
    };
};

export default <T extends SchemaObject>(schemas: T, actionName: keyof T) => {
    const middlewares = [];

    if (!schemas[actionName]) return [];

    if (schemas[actionName]?.authentication) {
        middlewares.push(auth.authMiddleware);
    }

    if (schemas[actionName]?.validationPipe) {
        middlewares.push(checkSchema(schemas[actionName].validationPipe as Schema<DefaultSchemaKeys>));
        middlewares.push(validationsPipeChecker);
    }

    return middlewares;
};
