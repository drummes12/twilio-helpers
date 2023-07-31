import { FlowInstance } from 'twilio/lib/rest/studio/v1/flow'
import { TwilioError } from '../../errors'
import { schemaStudioFlowSid } from '../../schemas'
import { accumulateWithPaginator, validateClientTwilio, validateVariables } from '../../utils'
import { client } from '../twilio'

/**
 * This function retrieves a list of all Studio Flows from the Twilio API.
 *
 * @example
 * const allStudioFlows = await getAllStudioFlows()
 */
export async function getAllStudioFlows () {
  validateClientTwilio()
  const studiosFlowsList: FlowInstance[] | [] = await client?.studio.v2.flows
    .page()
    .then((page) => accumulateWithPaginator(page, []))
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getStudioFlows ~ ${message}`, { ...error })
    })
  if (studiosFlowsList.length === 0) {
    throw new TwilioError('❌ ~ getAllStudioFlows ~ Studio Flows not found.', {
      status: 404,
      code: 'STUDIO_FLOWS_NOT_FOUND',
      moreInfo: 'https://www.twilio.com/docs/studio',
      details:
        'You not have studio flows created in your twilio console, you can validate it in: https://console.twilio.com/us1/develop/studio/flows'
    })
  }
  return studiosFlowsList
}

/**
 * This function retrieves a Studio Flow using its ID and returns a Promise that resolves with the Flow
 * object.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export async function getStudioFlow (studioFlowSid: string) {
  validateClientTwilio()
  validateVariables(schemaStudioFlowSid, studioFlowSid, 'getStudioFlow')
  return await client?.studio.v2.flows
    .get(studioFlowSid)
    .fetch()
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getStudioFlow ~ ${message}`, { ...error })
    })
}
