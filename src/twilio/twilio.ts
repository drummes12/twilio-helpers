import twilio, { Twilio } from 'twilio'

import { CreateClient } from '../types'

import { ClientTwilioError } from '../errors'
import { schemaAuth } from '../schemas'
import { validateVariables } from '../utils'

let client: Twilio | null

/**
 * This function createClient creates a Twilio client instance either using the provided accountSid and
 * authToken or by retrieving an existing client from the context object. It returns the Twilio client
 * instance that can be used to interact with Twilio APIs.
 *
 * @example
 * const client = createClient({
 *  accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  authToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  options: {}
 * )
 *
 * @example
 * const client = createClient({ context: { getTwilioClient: serverlessTwilio }})
 */
export function createClient({ context, accountSid, authToken, options }: CreateClient): Twilio | null {
  if (accountSid == null || authToken == null) {
    if (context?.getTwilioClient == null) {
      throw new ClientTwilioError('❌ ~ The context.getTwilioClient() object was not found.', {
        details: `This happens because it did not pass "context" in the parameters or is not within the Twilio environment. You should provide the "accountSid" and "authToken" as follows:
{ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }`,
      })
    }
    client = context.getTwilioClient(options)
    return client
  }

  validateVariables(schemaAuth, { accountSid, authToken }, 'createClient')
  client = twilio(accountSid, authToken, options)
  return client
}

/**
 * @private
 * @description This function is used internally in the tests and its use is not recommended.
 * Resets the Twilio client by assigning it the value `null`.
 */
export function _resetTwilioClient() {
  client = null
}

export { client }
