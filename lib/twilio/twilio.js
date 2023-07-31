"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports._resetTwilioClient = exports.createClient = void 0;
const twilio_1 = __importDefault(require("twilio"));
const errors_1 = require("../errors");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
let client = null;
exports.client = client;
/**
 * This function createClient creates a Twilio client instance either using the provided accountSid and
 * authToken or by retrieving an existing client from the context object. It returns the Twilio client
 * instance that can be used to interact with Twilio APIs.
 *
 * @example
 * const client = createClient({
 *  accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  authToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  options: {}
 * )
 *
 * @example
 * const client = createClient({ context: { getTwilioClient: serverlessTwilio }})
 */
function createClient({ context, accountSid, authToken, options }) {
    if (accountSid == null || authToken == null) {
        if (context?.getTwilioClient == null) {
            throw new errors_1.ClientTwilioError('❌ ~ The context.getTwilioClient() object was not found.', {
                details: `This happens because it did not pass "context" in the parameters or is not within the Twilio environment. You should provide the "accountSid" and "authToken" as follows:
{ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }`
            });
        }
        exports.client = client = context.getTwilioClient(options);
        return client;
    }
    (0, utils_1.validateVariables)(schemas_1.schemaAuth, { accountSid, authToken }, 'createClient');
    exports.client = client = (0, twilio_1.default)(accountSid, authToken, options);
    return client;
}
exports.createClient = createClient;
/**
 * @private
 * @description This function is used internally in the tests and its use is not recommended.
 * Resets the Twilio client by assigning it the value `null`.
 */
function _resetTwilioClient() {
    exports.client = client = null;
}
exports._resetTwilioClient = _resetTwilioClient;
