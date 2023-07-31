"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudioFlow = exports.getAllStudioFlows = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
const twilio_1 = require("../twilio");
/**
 * This function retrieves a list of all Studio Flows from the Twilio API.
 *
 * @example
 * const allStudioFlows = await getAllStudioFlows()
 */
async function getAllStudioFlows() {
    (0, utils_1.validateClientTwilio)();
    const studiosFlowsList = await twilio_1.client?.studio.v2.flows
        .page()
        .then((page) => (0, utils_1.accumulateWithPaginator)(page, []))
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getStudioFlows ~ ${message}`, { ...error });
    });
    if (studiosFlowsList.length === 0) {
        throw new errors_1.TwilioError('❌ ~ getAllStudioFlows ~ Studio Flows not found.', {
            status: 404,
            code: 'STUDIO_FLOWS_NOT_FOUND',
            moreInfo: 'https://www.twilio.com/docs/studio',
            details: 'You not have studio flows created in your twilio console, you can validate it in: https://console.twilio.com/us1/develop/studio/flows'
        });
    }
    return studiosFlowsList;
}
exports.getAllStudioFlows = getAllStudioFlows;
/**
 * This function retrieves a Studio Flow using its ID and returns a Promise that resolves with the Flow
 * object.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
async function getStudioFlow(studioFlowSid) {
    (0, utils_1.validateClientTwilio)();
    (0, utils_1.validateVariables)(schemas_1.schemaStudioFlowSid, studioFlowSid, 'getStudioFlow');
    return await twilio_1.client?.studio.v2.flows
        .get(studioFlowSid)
        .fetch()
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getStudioFlow ~ ${message}`, { ...error });
    });
}
exports.getStudioFlow = getStudioFlow;
