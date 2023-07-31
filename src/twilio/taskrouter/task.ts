import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace'
import { TwilioError } from '../../errors'
import { schemaString, schemaTaskSid, schemaWorkspace } from '../../schemas'
import { validateVariables } from '../../utils'

export async function fetchTask (workspace: WorkspaceContext, taskSid: string) {
  validateVariables(schemaWorkspace, workspace, 'fetchTask')
  validateVariables(schemaTaskSid, taskSid, 'fetchTask')

  return await workspace
    .tasks(taskSid)
    .fetch()
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error })
    })
}

export async function findTaskEvaluatingAttributes (
  workspace: WorkspaceContext,
  evaluateTaskAttributes: string,
  limit?: number
) {
  validateVariables(schemaWorkspace, workspace, 'findTaskEvaluatingAttributes')
  validateVariables(schemaString, evaluateTaskAttributes, 'findTaskEvaluatingAttributes')

  return await workspace.tasks
    .list({
      evaluateTaskAttributes,
      limit
    })
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createTaskQueue ~ ${message}`, { ...error })
    })
}
