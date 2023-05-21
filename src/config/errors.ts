import {
    BAD_REQUEST_CODE,
    CONFLICT_CODE, FORBIDDEN_CODE,
    NOT_FOUND_CODE, SERVICE_UNAVAILABLE_CODE,
    UNAUTHORIZED_CODE,
    UNSUPPORTED_MEDIA_TYPE_CODE, VALIDATION_ERROR_CODE
} from "./statusCodes";
import {PERMISSION_DENIED, SERVICE_UNAVAILABLE, SOMETHING_WENT_WRONG, VALIDATION_ERROR} from "./constants";

export class AuthError extends Error {
    status: number = UNAUTHORIZED_CODE;
    message: string;
    errors: null;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    status: number = BAD_REQUEST_CODE;
    message: string;
    errors: null;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class UnsupportedMediaType extends Error {
    status: number = UNSUPPORTED_MEDIA_TYPE_CODE;
    message: string;
    errors: null;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    status: number = CONFLICT_CODE;
    message: string;
    errors: null;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status: number = NOT_FOUND_CODE;
    message: string;
    errors: null;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    status: number = FORBIDDEN_CODE;
    message: string = PERMISSION_DENIED;
    errors: null;

    constructor(message: string, errors = null) {
        super(message);
        this.errors = errors;
        this.message = message;
    }
}

export class ValidationError extends Error {
    status: number = VALIDATION_ERROR_CODE;
    message: string = VALIDATION_ERROR;
    errors: null;

    constructor(errors = null) {
        super();
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    status: number = SERVICE_UNAVAILABLE_CODE;
    message: string = SERVICE_UNAVAILABLE;
    errors: null;

    constructor(errors = null) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors: null | string;

    constructor(message: string, errors = null) {
        super();

        this.message = message;

        if (errors) {
            this.errors = errors;
        } else {
            this.errors = message;
        }
    }
}