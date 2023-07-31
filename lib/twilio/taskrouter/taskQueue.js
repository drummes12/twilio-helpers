"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskQueue = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
/**
 * Creates a new Task Queue in a Twilio TaskRouter workspace.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * const options = {
 *  friendlyName: string;
    targetWorkers?: string;
    maxReservedWorkers?: number;
    taskOrder?: TaskQueueTaskOrder;
    reservationActivitySid?: string;
    assignmentActivitySid?: string;
 * }
 *
 * try {
 *   const newTaskQueue = await createTaskQueue(workspace, options);
 *   console.log('New Task Queue created:', newTaskQueue);
 * } catch (error) {
 *   console.error('Error creating Task Queue:', error.message);
 * }
 */
async function createTaskQueue(workspace, options) {
    (0, utils_1.validateVariables)(schemas_1.schemaWorkspace, workspace, 'createTaskQueue');
    (0, utils_1.validateVariables)(schemas_1.schemaOptionsCreateTaskQueue, options, 'createTaskQueue');
    return await workspace.taskQueues.create(options).catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error });
    });
}
exports.createTaskQueue = createTaskQueue;
