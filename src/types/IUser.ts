import {USER_ROLES} from "../config/constants";

export interface IUser {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: typeof USER_ROLES[keyof typeof USER_ROLES];
    email: string;
    password: string;
    isActivated?: boolean;
    activationLink?: string;
    id?: string;
    _id?: string;
}