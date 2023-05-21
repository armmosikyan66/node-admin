import User from "./user";
import Token from "./token";
import {Mongoose} from "mongoose";

export default function initModels(mongoose: Mongoose): void {
    User(mongoose);
    Token(mongoose);
}
