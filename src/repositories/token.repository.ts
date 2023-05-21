import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {jwtAccessToken, jwtRefreshToken} from "../config";
import {IToken} from "../types/IToken";

interface IOptions {
    user?: string;
    _id?: string;
    token?: string
}

class TokenRepo {
    private model;

    constructor() {
        this.model = mongoose.model("Tokens");
    }

    public generateTokens(payload: string) {
        const accessToken = jwt.sign(payload, jwtAccessToken, {
            expiresIn: "1m",
        });
        const refreshToken = jwt.sign(payload, jwtRefreshToken, {
            expiresIn: "1d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(data: IToken): Promise<IToken> {
        return await this.model.create(data);
    }

    public async findAndModify(options: IOptions, data: IToken): Promise<IToken | null> {
        return await this.model.findOneAndUpdate(options, data, {
            new: true
        })
    }

    public async findOne(options: IOptions): Promise<IToken | null> {
        return await this.model.findOne(options).exec();
    }

    public validateRefresh(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, jwtRefreshToken)
    }
}

export default TokenRepo;
