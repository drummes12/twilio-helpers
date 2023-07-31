import { CompleteErrorDetails, SimpleErrorDetails } from './types';
export declare class ClientTwilioError extends Error {
    status: number;
    details: string;
    constructor(message: string, { status, details }: SimpleErrorDetails);
}
export declare class TwilioError extends Error {
    status: number;
    code: string;
    more_info: string;
    details: string;
    constructor(message: string, { status, code, moreInfo, details }: CompleteErrorDetails);
}
export declare class ValidationError extends Error {
    status: number;
    details: string;
    constructor(message: string, { status, details }: SimpleErrorDetails);
}
export declare class HelperError extends Error {
    status: number;
    code: string;
    more_info: string;
    details: string;
    constructor(message: string, { status, code, moreInfo, details }: CompleteErrorDetails);
}
