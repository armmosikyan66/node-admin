import mongoose from "mongoose";
import {IUser} from "../types/IUser";
import {USER_ROLES} from "../config/constants";
import {DeleteResult} from "mongodb";

interface IOptions {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: typeof USER_ROLES[keyof typeof USER_ROLES] ,
    email?: string;
    _id?: string;
}

export interface IGetUsers {
    users: IUser[],
    currentPage: number,
    totalPages: number,
    founded: number,
}

class UserRepository {
    private model;
    constructor() {
        this.model = mongoose.model("User");
    }

    public async findOne(options: IOptions): Promise<IUser | null> {
        return await this.model.findOne(options);
    }

    public async create(data: IUser): Promise<IUser> {
        return await this.model.create(data);
    }

    public async findAndModify(options: IOptions, data: object): Promise<IUser | null> {
        return await this.model.findOneAndUpdate(options, data, {
            new: true
        })
    }

    public async getUsers(page = 1, show = 10, filter = {}, sort = {}): Promise<IGetUsers> {
        const skipIndex = (page - 1) * show;

        const [users, count] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skipIndex).limit(show),
            this.model.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(count / show);

        return {
            users,
            currentPage: page,
            totalPages,
            founded: count,
        };
    }

    public async delete(data: IOptions): Promise<DeleteResult> {
        return await this.model.deleteMany(data);
    }
}

export default UserRepository;