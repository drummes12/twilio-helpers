import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace'
import { TaskQueueListInstanceCreateOptions } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue'

import { TwilioError } from '../../errors'
import { schemaOptionsCreateTaskQueue, schemaWorkspace } from '../../schemas'
import { validateVariables } from '../../utils'

export async function createTaskQueue (workspace: WorkspaceContext, options: TaskQueueListInstanceCreateOptions) {
  validateVariables(schemaWorkspace, workspace, 'createTaskQueue')
  validateVariables(schemaOptionsCreateTaskQueue, options, 'createTaskQueue')

  return await workspace.taskQueues.create(options).catch((error) => {
    const message: string = error.message
    throw new TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error })
  })
}
