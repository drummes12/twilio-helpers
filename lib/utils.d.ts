import '@twilio-labs/serverless-runtime-types';
import { Schema } from 'joi';
import { CompleteErrorDetails, HeadersResponse, Paginator, SimpleErrorDetails } from './types';
/**
 * Validates the Twilio client and ensures that it is initialized.
 * Throws a ClientTwilioError if the client is not found or not initialized.
 */
export declare function validateClientTwilio(): void;
/**
 * This function checks if any of the variables in an array are undefined, and throws an error with a message
 * if so.
 *
 * @example
 * try {
 *  validateVariables(Joi.object(), {}, 'testFunction')
 * } catch (e) {
 *  console.error(e.message)
 * }
 */
export declare function validateVariables(schema: Schema, data: unknown, functionName?: string): void;
/**
 * Accumulate items from a paginated response.
 *
 * @example
 * const allConversationOfAddress = await client.conversations.v1.participantConversations
 *  .page({ address })
 *  .then((page) => accumulateWithPaginator(page, [], 'instances'))
 *
 * @example
 * const allConversationOfAddress = await client.conversations.v1.participantConversations
 *  .page({ address })
 *  .then((page) => accumulateWithPaginator(page))
 */
export declare function accumulateWithPaginator(paginator: Paginator, accumulator?: object[]): any;
/**
 * Creates a Twilio Response object with the given status code, body and headers.
 *
 * @example
 * callback(null, createResponse(200, { success: true }))
 *
 * @example
 * callback(null, createResponse(400, { success: false, error: new Error() }))
 *
 * @example
 * const headers = {
 *  'Access-Control-Allow-Origin': '*',
 *  'Access-Control-Allow-Methods': 'PATCH, PUT',
 * }
 * callback(null, createResponse(200, { success:true }, headers))
 */
export declare function createResponse(statusCode: number, body?: {}, headers?: HeadersResponse): import("@twilio-labs/serverless-runtime-types/types").TwilioResponse;
/**
 * Function to handle and format errors caught in try-catch blocks of asynchronous functions
 *
 * @example
 * try {
 *  // Logic
 * }
 * catch (error) {
 *  const { codeStatus, body } = responseCatchError(error)
 *  callback(null, createResponse(codeStatus, body))
 * }
 */
export declare function responseCatchError(error?: CompleteErrorDetails | SimpleErrorDetails): {
    codeStatus: number;
    body: {
        status?: number | undefined;
        details?: string | undefined;
        success: boolean;
    } | {
        status: number;
        code: string;
        moreInfo: string;
        details: string;
        success: boolean;
    };
};
