"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExecutionStudioFlow = exports.getExecutionsStudioFlow = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
/**
 * This function retrieves all executions of a given Studio flow using pagination.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const allExecutionsStudioFlow = await getExecutionsStudioFlow(studioFlow)
 */
async function getExecutionsStudioFlow(studioFlow) {
    (0, utils_1.validateVariables)(schemas_1.schemaStudioFlowSid, studioFlow, 'getExecutionsStudioFlow');
    return await studioFlow
        .executions()
        .page()
        .then((page) => (0, utils_1.accumulateWithPaginator)(page, []))
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getExecutionsStudioFlow ~ ${message}`, { ...error });
    });
}
exports.getExecutionsStudioFlow = getExecutionsStudioFlow;
/**
 * This function creates a new execution for a given studio flow with specified parameters and error
 * handling.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const executionStudioFlow = await createExecutionStudioFlow(studioFlow, {
 *  from: 'whatsapp:+1234567890',
 *  to: 'whatsapp:+1234567890',
 *  parameters: {
 *    test: 'test',
 *  }
 * })
 */
async function createExecutionStudioFlow(studioFlow, { to, from, parameters = {} }) {
    (0, utils_1.validateVariables)(schemas_1.schemaExecutionStudioFlow, { studioFlow, options: { to, from, parameters } }, 'createExecutionStudioFlow');
    return await studioFlow
        .executions()
        .create({ to, from, parameters })
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createExecutionStudioFlow ~ ${message}`, { ...error });
    });
}
exports.createExecutionStudioFlow = createExecutionStudioFlow;
