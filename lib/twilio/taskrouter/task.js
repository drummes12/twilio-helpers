"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaskEvaluatingAttributes = exports.fetchTask = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
/**
 * Fetches a specific task from a Twilio TaskRouter workspace.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * try {
 *   const task = await fetchTask(workspace, 'WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
 *   console.log('Task fetched successfully:', task);
 * } catch (error) {
 *   console.error('Error fetching task:', error.message);
 * }
 */
async function fetchTask(workspace, taskSid) {
    (0, utils_1.validateVariables)(schemas_1.schemaWorkspace, workspace, 'fetchTask');
    (0, utils_1.validateVariables)(schemas_1.schemaTaskSid, taskSid, 'fetchTask');
    return await workspace
        .tasks(taskSid)
        .fetch()
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error });
    });
}
exports.fetchTask = fetchTask;
/**
 * Finds tasks in a Twilio TaskRouter workspace that are evaluating specified attributes.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * const evaluateTaskAttributes = '(language == "en" OR language == "fr") AND skill_rating >= 5.1'
 *
 * try {
 *   const tasks = await findTaskEvaluatingAttributes(workspace, evaluateTaskAttributes, 10);
 *   console.log('Matching tasks found:', tasks);
 * } catch (error) {
 *   console.error('Error finding tasks:', error.message);
 * }
 */
async function findTaskEvaluatingAttributes(workspace, evaluateTaskAttributes, limit) {
    (0, utils_1.validateVariables)(schemas_1.schemaWorkspace, workspace, 'findTaskEvaluatingAttributes');
    (0, utils_1.validateVariables)(schemas_1.schemaString, evaluateTaskAttributes, 'findTaskEvaluatingAttributes');
    return await workspace.tasks
        .list({
        evaluateTaskAttributes,
        limit
    })
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ findTaskEvaluatingAttributes ~ ${message}`, { ...error });
    });
}
exports.findTaskEvaluatingAttributes = findTaskEvaluatingAttributes;
