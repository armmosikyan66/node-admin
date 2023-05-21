import {Mongoose} from "mongoose";
import {IToken} from "../../types/IToken";

export default (mongoose: Mongoose) => {
    const TokenSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        token: {
            type: String,
            default: "",
        }
    }, {timestamps: true})

    return mongoose.model<IToken>("Tokens", TokenSchema);
};
