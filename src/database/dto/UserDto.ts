import {IUser} from "../../types/IUser";
import {USER_ROLES} from "../../config/constants";

export default class UserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly phoneNumber: string;
    readonly role: typeof USER_ROLES[keyof typeof USER_ROLES];
    readonly email: string;
    readonly isActivated?: boolean;
    readonly activationLink?: string;
    readonly id?: string;

    constructor(obj: IUser) {
        this.lastName = obj.lastName;
        this.firstName = obj.firstName;
        this.phoneNumber = obj.phoneNumber;
        this.role = obj.role;
        this.email = obj.email;
        this.isActivated = obj.isActivated;
        this.activationLink = obj.activationLink;
        this.id = obj._id;
    }
}