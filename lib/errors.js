"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperError = exports.ValidationError = exports.TwilioError = exports.ClientTwilioError = void 0;
class ClientTwilioError extends Error {
    constructor(message, { status = 401, details = '' }) {
        super(message);
        this.name = 'ClientTwilioError';
        this.status = status;
        this.details = details;
    }
}
exports.ClientTwilioError = ClientTwilioError;
class TwilioError extends Error {
    constructor(message, { status, code, moreInfo, details }) {
        super(message);
        this.name = 'TwilioError';
        this.status = status;
        this.code = code;
        this.more_info = moreInfo;
        this.details = details;
    }
}
exports.TwilioError = TwilioError;
class ValidationError extends Error {
    constructor(message, { status = 428, details = '' }) {
        super(message);
        this.name = 'ValidationError';
        this.status = status;
        this.details = details;
    }
}
exports.ValidationError = ValidationError;
class HelperError extends Error {
    constructor(message, { status, code, moreInfo, details }) {
        super(message);
        this.name = 'HelperError';
        this.status = status;
        this.code = code;
        this.more_info = moreInfo;
        this.details = details;
    }
}
exports.HelperError = HelperError;
