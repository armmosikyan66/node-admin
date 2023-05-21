import {INVALID, REQUIRED} from "../../config/constants";

export default {
    checkAuth: {
        authentication: true
    },
    register: {
        authentication: false,
        validationPipe: {
            firstName: {
                in: "body",
                trim: true,
                isLength: {
                    errorMessage: INVALID("First Name"),
                    options: { min: 2, max: 20 }
                },
                notEmpty: {
                    errorMessage: REQUIRED("First Name")
                },
            },
            lastName: {
                in: "body",
                trim: true,
                isLength: {
                    errorMessage: INVALID("Last Name"),
                    options: { min: 2, max: 25 }
                },
                notEmpty: {
                    errorMessage: REQUIRED("Last Name")
                },
            },
            password: {
                in: "body",
                trim: true,
                isLength: {
                    errorMessage: INVALID("Password"),
                    options: { min: 6, max: 20 }
                },
                notEmpty: {
                    errorMessage: REQUIRED("Password")
                },
            },
            email: {
                in: "body",
                trim: true,
                notEmpty: {
                    errorMessage: REQUIRED("Email"),
                },
                isEmail: {
                    errorMessage: INVALID("Email"),
                },
            },
            phoneNumber: {
                in: "body",
                isString: {
                    errorMessage: INVALID("Phone Number"),
                },
                notEmpty: {
                    errorMessage: REQUIRED("Phone Number"),
                },
            },
        }
    },
    login: {
        authentication: false,
        validationPipe: {
            password: {
                in: "body",
                trim: true,
                isLength: {
                    errorMessage: INVALID("password"),
                    options: {
                        min: 2,
                        max: 20,
                    },
                },
                notEmpty: {
                    errorMessage: REQUIRED("password"),
                },
            },
            email: {
                in: "body",
                trim: true,
                notEmpty: {
                    errorMessage: REQUIRED("E-mail"),
                },
                isEmail: {
                    errorMessage: INVALID("E-mail"),
                },
            },
        },
    },
}