import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace'
import { TaskQueueListInstanceCreateOptions } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue'

import { TwilioError } from '../../errors'
import { schemaOptionsCreateTaskQueue, schemaWorkspace } from '../../schemas'
import { validateVariables } from '../../utils'

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
export async function createTaskQueue (workspace: WorkspaceContext, options: TaskQueueListInstanceCreateOptions) {
  validateVariables(schemaWorkspace, workspace, 'createTaskQueue')
  validateVariables(schemaOptionsCreateTaskQueue, options, 'createTaskQueue')

  return await workspace.taskQueues.create(options).catch((error) => {
    const message: string = error.message
    throw new TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error })
  })
}
