import {Mongoose} from "mongoose";
import {IUser} from "../../types/IUser";
import {USER_ROLES} from "../../config/constants";

export default (mongoose: Mongoose) => {
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: false
        },
        role: {
            type: String,
            default: "user",
            enum: Object.values(USER_ROLES)
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        activationLink: {
            type: String
        }
    }, {timestamps: true})

    return mongoose.model<IUser>("User", UserSchema);
};
