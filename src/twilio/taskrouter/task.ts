import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace'
import { TwilioError } from '../../errors'
import { schemaString, schemaTaskSid, schemaWorkspace } from '../../schemas'
import { validateVariables } from '../../utils'

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
      throw new TwilioError(`❌ ~ findTaskEvaluatingAttributes ~ ${message}`, { ...error })
    })
}
