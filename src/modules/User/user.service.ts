import UserDto from "../../database/dto/UserDto";
import {Query} from "./user.controller";
import UserRepository from "../../repositories/user.repository";

const userRepo = new UserRepository();

class UserService {
    static async getUsers(page: number, show: number, query: Query, filter = {}) {
        const $or = [];
        const {search, sort} = query;
        const searchValue = search?.replace(/\s+/g, "\\s*");
        const searchRegex = new RegExp(searchValue, "i");
        const sortBy = JSON.parse(sort);

        if (searchValue?.length) {
            $or.push(
                { firstName: { $regex: searchRegex } },
                { lastName: { $regex: searchRegex } },
                { phoneNumber: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { role: { $regex: searchRegex } },
            )
        }

        const users = await userRepo.getUsers(
            Number(page),
            Number(show),
            $or.length ? {$or} : {},
            sortBy
        );

        return {
            ...users,
            users: users.users.map((user) => new UserDto(user)),
        };
    }
}

export default UserService;
