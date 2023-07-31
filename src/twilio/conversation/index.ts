import { TwilioError } from '../../errors'
import { schemaConversationSid } from '../../schemas'
import { validateClientTwilio, validateVariables } from '../../utils'
import { client } from '../twilio'

/**
 * Creates a new conversation.
 *
 * @example
 * const conversation = await createConversation()
 */
export async function createConversation () {
  validateClientTwilio()
  return await client?.conversations.v1.conversations.create().catch((error) => {
    throw new TwilioError(`❌ ~ createConversation ~ ${error.message}`, { ...error })
  })
}

/**
 * This function fetches a conversation using its unique identifier and returns a promise that resolves
 * with the conversation object.
 *
 * @example
 * const conversation = await fetchConversation('CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export async function fetchConversation (conversationSid: string) {
  validateClientTwilio()
  validateVariables(schemaConversationSid.required(), conversationSid, 'fetchConversation')

  return await client?.conversations.v1
    .conversations(conversationSid)
    .fetch()
    .catch((error) => {
      throw new TwilioError(`❌ ~ fetchConversation ~ ${error.message}`, { ...error })
    })
}

export * as message from './message'
export * as participants from './participant'
export * as webhook from './webhook'
