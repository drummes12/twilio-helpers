import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation'
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation/message'

import { validateVariables } from '../../common/utils'
import { schemaMessageContentConversation, schemaMessageConversation } from '../../common/schemas'
import { TwilioError } from '../../common/errors'
import { Content } from '../../interfaces'

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
  { author, body }: MessageListInstanceCreateOptions
) {
  validateVariables(
    schemaMessageConversation,
    { conversation, options: { author, body } },
    'createMessageInConversation'
  )
  return await conversation
    .messages()
    .create({ author, body })
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createMessageInConversation ~ ${message}`, { ...error })
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
  { author, content }: { author: string, content: Content }
) {
  validateVariables(
    schemaMessageContentConversation,
    { conversation, options: { author, content } },
    'createMessageContentInConversation'
  )
  return await conversation
    .messages()
    .create({
      author,
      contentSid: content.sid,
      contentVariables: JSON.stringify(content.variables)
    })
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createMessageContentInConversation ~ ${message}`, { ...error })
    })
}
