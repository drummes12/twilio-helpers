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
export function createConversation() {
  validateClientTwilio()
  return client?.conversations.v1.conversations.create().catch((error) => {
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
export function fetchConversation(conversationSid: string) {
  validateClientTwilio()
  validateVariables(schemaConversationSid.required(), conversationSid, 'fetchConversation')

  return client?.conversations.v1
    .conversations(conversationSid)
    .fetch()
    .catch((error) => {
      throw new TwilioError(`❌ ~ fetchConversation ~ ${error.message}`, { ...error })
    })
}

export * as message from './message'
export * as participants from './participant'
export * as webhook from './webhook'
