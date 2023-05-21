import User from "./user";
import Token from "./token";
import mongo from "mongoose";
export default function initModels(mongoose: typeof mongo): void {
    User(mongoose);
    Token(mongoose);
}
