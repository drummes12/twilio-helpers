"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCatchError = exports.createResponse = exports.accumulateWithPaginator = exports.validateVariables = exports.validateClientTwilio = void 0;
require("@twilio-labs/serverless-runtime-types");
const joi_1 = require("joi");
const errors_1 = require("./errors");
const schemas_1 = require("./schemas");
const twilio_1 = require("./twilio/twilio");
/**
 * Validates the Twilio client and ensures that it is initialized.
 * Throws a ClientTwilioError if the client is not found or not initialized.
 */
function validateClientTwilio() {
    if (twilio_1.client == null) {
        throw new errors_1.ClientTwilioError('❌ ~ Twilio client not found', {
            details: `The Twilio client is not initialized. Please provide the accountSid and authToken to initialize the client as follows:
createClient({ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" })
or
createClient({ context })`
        });
    }
}
exports.validateClientTwilio = validateClientTwilio;
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
function validateVariables(schema, data, functionName = '') {
    if (!(0, joi_1.isSchema)(schema)) {
        throw new errors_1.ValidationError(`❌ ~ ${functionName} ~ Required schema not provided`, {
            details: 'First parameter must be a schema'
        });
    }
    const result = schema.validate(data);
    const { error } = result;
    if (error != null) {
        throw new errors_1.ValidationError(`❌ ~ ${functionName} ~ Required parameter not provided`, {
            details: error.message
        });
    }
}
exports.validateVariables = validateVariables;
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
function accumulateWithPaginator(paginator, accumulator = []) {
    const items = paginator?.instances;
    if (items === null)
        return [];
    accumulator.push(...items);
    return (paginator?.getNextPageUrl() != null)
        ? paginator.nextPage()?.then((page) => accumulateWithPaginator(page, accumulator))
        : accumulator;
}
exports.accumulateWithPaginator = accumulateWithPaginator;
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
function createResponse(statusCode, body = {}, headers) {
    validateVariables(schemas_1.schemaResponse, { statusCode, body }, 'createResponse');
    const response = new Twilio.Response();
    if (headers == null) {
        response.appendHeader('Access-Control-Allow-Origin', '*');
        response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
        response.appendHeader('Content-Type', 'application/json');
    }
    else {
        Object.keys(headers).forEach((key) => {
            response.appendHeader(key, headers[key]);
        });
    }
    response.setStatusCode(statusCode);
    response.setBody(body);
    return response;
}
exports.createResponse = createResponse;
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
function responseCatchError(error = {}) {
    const { status = 400 } = error;
    const success = false;
    const body = { success, ...error };
    const codeStatus = status;
    return { codeStatus, body };
}
exports.responseCatchError = responseCatchError;
