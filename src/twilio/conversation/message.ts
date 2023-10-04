import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation'
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation/message'

import { validateVariables } from '../../common/utils'
import { schemaMessageContentConversation, schemaMessageConversation } from '../../common/schemas'
import { TwilioError } from '../../common/errors'
import { CreateContentConversationOptions } from '../../interfaces'

/**
 * Creates a message in a conversation with body.
 *
 * @example
 * const options = {
 *   author: 'John Doe',
 *   body: 'Hello, World!'
 * }
 * const message = await createMessageInConversation(conversation, options)
 */
export async function createMessageInConversation (
  conversation: ConversationInstance,
  options: MessageListInstanceCreateOptions
) {
  validateVariables(schemaMessageConversation.required(), { conversation, options }, 'createMessage')
  return await conversation.messages()
    .create(options)
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createMessage ~ ${message}`, { ...error })
    })
}

/**
 * Creates a message in a conversation with Content API.
 *
 * @example
 * const options = {
 *   author: 'John Doe',
 *   content: {
 *     sid: 'HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *     variables: { 1: 'value1', 2: 'value2' }
 *   }
 * }
 * const message = await createMessageContentInConversation(conversation, options)
 */
export async function createMessageContentInConversation (
  conversation: ConversationInstance,
  { content, ...options }: CreateContentConversationOptions
) {
  validateVariables(schemaMessageContentConversation.required(), { conversation, options: { ...options, content } }, 'createMessageContent')
  return await conversation?.messages()
    .create({
      ...options,
      contentSid: content.sid,
      contentVariables: ((content?.variables) != null) ? JSON.stringify(content.variables) : undefined
    })
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createMessageContent ~ ${message}`, { ...error })
    })
}
