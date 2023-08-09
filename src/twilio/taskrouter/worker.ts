import { TwilioError } from '../../common/errors'
import { schemaString, schemaWorkerSid, schemaWorkspace } from '../../common/schemas'
import { validateVariables } from '../../common/utils'
import { workspace } from '.'

/**
 * Fetches a specific worker from a Twilio workerRouter workspace.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * try {
 *   const worker = await fetchWorker('WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
 *   console.log('worker fetched successfully:', worker);
 * } catch (error) {
 *   console.error('Error fetching worker:', error.message);
 * }
 */
export async function fetchWorker (workerSid: string) {
  validateVariables(schemaWorkspace, workspace, 'fetchWorker')
  validateVariables(schemaWorkerSid, workerSid, 'fetchWorker')

  return await workspace?.workers(workerSid)
    .fetch()
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ fetchWorker ~ ${message}`, { ...error })
    })
}

/**
 * Finds workers in a Twilio TaskRouter workspace that are evaluating specified attributes.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * const targetWorkersExpression = 'name IN ['Alice','Bob','Connie','David']'
 *
 * try {
 *   const workers = await findWorkerEvaluatingExpression(workspace, targetWorkersExpression, 10);
 *   console.log('Matching workers found:', workers);
 * } catch (error) {
 *   console.error('Error finding workers:', error.message);
 * }
 */
export async function findWorkerEvaluatingExpression (
  targetWorkersExpression: string,
  limit?: number
) {
  validateVariables(schemaWorkspace, workspace, 'findWorkerEvaluatingExpression')
  validateVariables(schemaString, targetWorkersExpression, 'findWorkerEvaluatingExpression')

  return await workspace?.workers
    .list({
      targetWorkersExpression,
      limit
    })
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ findWorkerEvaluatingExpression ~ ${message}`, { ...error })
    })
}
