"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentByName = exports.getContentsBySid = exports.getContents = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
const twilio_1 = require("../twilio");
/**
 * This function retrieves a list of contents from the Twilio API and throws an error if no contents
 * are found.
 *
 * @example
 * const allContents = await getContents()
 */
async function getContents() {
    (0, utils_1.validateClientTwilio)();
    const contentsList = await twilio_1.client?.content.v1.contents
        .page()
        .then((page) => (0, utils_1.accumulateWithPaginator)(page, []))
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getContents ~ ${message}`, { ...error });
    });
    if (contentsList.length === 0) {
        throw new errors_1.TwilioError('❌ ~ getContents ~ Contents not found.', {
            status: 404,
            code: 'CONTENTS_NOT_FOUND',
            moreInfo: 'https://www.twilio.com/docs/content-editor/overview',
            details: 'You not have content created in your twilio console, you can validate it in: https://console.twilio.com/us1/develop/sms/content-editor'
        });
    }
    return contentsList;
}
exports.getContents = getContents;
/**
 * Retrieves the Content object that matches the specified SID
 *
 * @example
 * const content = await getContentsBySid('HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
async function getContentsBySid(contentSid) {
    (0, utils_1.validateVariables)(schemas_1.schemaContentSid.required(), contentSid, 'getContentsBySid');
    return await twilio_1.client?.content.v1.contents
        .get(contentSid)
        .fetch()
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getContentsBySid ~ ${message}`, { ...error });
    });
}
exports.getContentsBySid = getContentsBySid;
/**
 * Retrieves the Content object that matches the specified name
 *
 * @example
 * const content = await getContentByName('template-name')
 */
async function getContentByName(contentName) {
    (0, utils_1.validateVariables)(schemas_1.schemaString.required(), contentName, 'getContentByName');
    const contentsList = await getContents();
    return contentsList.find((content) => content.friendlyName === contentName);
}
exports.getContentByName = getContentByName;
