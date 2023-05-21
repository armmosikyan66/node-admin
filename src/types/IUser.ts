import {USER_ROLES} from "../config/constants";

export interface IUser {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: keyof typeof USER_ROLES,
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
}