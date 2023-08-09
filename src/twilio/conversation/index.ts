import { TwilioError } from '../../common/errors'
import { schemaConversationSid } from '../../common/schemas'
import { validateClientTwilio, validateVariables } from '../../common/utils'
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
    const message: string = error.message
    throw new TwilioError(`❌ ~ createConversation ~ ${message}`, { ...error })
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
      const message: string = error.message
      throw new TwilioError(`❌ ~ fetchConversation ~ ${message}`, { ...error })
    })
}

export * as message from './message'
export * as participants from './participant'
export * as webhook from './webhook'
