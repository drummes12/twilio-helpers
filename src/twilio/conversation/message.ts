import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation'
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation/message'

import { validateVariables } from '../../utils'
import { schemaMessageContentConversation, schemaMessageConversation } from '../../schemas'
import { TwilioError } from '../../errors'
import { Content } from '../../types'

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
export function createMessageInConversation(
  conversation: ConversationInstance,
  { author, body }: MessageListInstanceCreateOptions
) {
  validateVariables(
    schemaMessageConversation,
    { conversation, options: { author, body } },
    'createMessageInConversation'
  )
  return conversation
    .messages()
    .create({ author, body })
    .catch((error) => {
      throw new TwilioError(`❌ ~ createMessageInConversation ~ ${error.message}`, { ...error })
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
export function createMessageContentInConversation(
  conversation: ConversationInstance,
  { author, content }: { author: string; content: Content }
) {
  validateVariables(
    schemaMessageContentConversation,
    { conversation, options: { author, content } },
    'createMessageContentInConversation'
  )
  return conversation
    .messages()
    .create({
      author,
      contentSid: content.sid,
      contentVariables: JSON.stringify(content.variables),
    })
    .catch((error) => {
      throw new TwilioError(`❌ ~ createMessageContentInConversation ~ ${error.message}`, { ...error })
    })
}
