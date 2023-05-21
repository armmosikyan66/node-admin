import mongo from "mongoose";
import {ObjectId} from "mongodb";
import {IToken} from "../../types/IToken";

export default (mongoose: typeof mongo) => {
    const TokenSchema = new mongoose.Schema({
        user: {
            type: ObjectId,
            ref: "Users",
        },
        token: {
            type: String,
            default: "",
        }
    }, {timestamps: true})

    return mongoose.model<IToken>("Tokens", TokenSchema);
};
