import { FlowInstance } from 'twilio/lib/rest/studio/v1/flow'

import { TwilioError } from '../../errors'
import { schemaExecutionStudioFlow, schemaStudioFlowSid } from '../../schemas'
import { accumulateWithPaginator, validateVariables } from '../../utils'
import { CreateExecutionStudioFlowOptions } from '../../types'

/**
 * This function retrieves all executions of a given Studio flow using pagination.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const allExecutionsStudioFlow = await getExecutionsStudioFlow(studioFlow)
 */
export async function getExecutionsStudioFlow (studioFlow: FlowInstance) {
  validateVariables(schemaStudioFlowSid, studioFlow, 'getExecutionsStudioFlow')
  return await studioFlow
    .executions()
    .page()
    .then((page) => accumulateWithPaginator(page, []))
    .catch((error) => {
      throw new TwilioError(`❌ ~ getExecutionsStudioFlow ~ ${error.message}`, { ...error })
    })
}

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
export async function createExecutionStudioFlow (studioFlow: FlowInstance, { to, from, parameters = {} }: CreateExecutionStudioFlowOptions) {
  validateVariables(
    schemaExecutionStudioFlow,
    { studioFlow, options: { to, from, parameters } },
    'createExecutionStudioFlow'
  )
  return await studioFlow
    .executions()
    .create({ to, from, parameters })
    .catch((error) => {
      throw new TwilioError(`❌ ~ createExecutionStudioFlow ~ ${error.message}`, { ...error })
    })
}
