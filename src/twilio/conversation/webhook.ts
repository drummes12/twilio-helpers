import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation'

import { validateVariables } from '../../utils'
import { schemaFindWebhookTargetConversation, schemaWebhookConversation } from '../../schemas'
import { TwilioError } from '../../errors'
import { CreateWebhookOptions } from '../../types'
import { WebhookTarget } from 'twilio/lib/rest/conversations/v1/conversation/webhook'

/**
 * Adds a webhook to a conversation
 *
 * @example
 * const conversations = await addWebhookInConversation(conversation, {
 *  target: 'studio',
 *  flowSid: 'FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 * })
 *
 * @example
 * const conversations = await addWebhookInConversation(conversation, {
 *  target: 'webhook',
 *  method: 'POST',
 *  filters: ['onMessageAdded'],
 *  url: 'https://example.com'
 * })
 */
export async function addWebhookInConversation (
  conversation: ConversationInstance,
  { method = 'POST', filters, triggers, url, target, flowSid }: CreateWebhookOptions
) {
  validateVariables(
    schemaWebhookConversation,
    { conversation, options: { method, filters, triggers, url, target, flowSid } },
    'addWebhookInConversation'
  )
  const configurationWebhook = {
    'configuration.method': method,
    'configuration.filters': filters,
    'configuration.triggers': triggers,
    'configuration.flowSid': flowSid,
    'configuration.url': url,
    target
  }
  return await conversation
    .webhooks()
    .create(configurationWebhook)
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ addWebhookInConversation ~ ${message}`, { ...error })
    })
}

/**
 * This function updates a webhook in a conversation to target a specific Studio flow.
 *
 * @example
 * const conversations = await findWebhooksTargetInConversation(conversation, {
 *  target: 'studio'
 * })
 */
export async function findWebhooksTargetInConversation (conversation: ConversationInstance, target: WebhookTarget) {
  validateVariables(schemaFindWebhookTargetConversation, { conversation, target }, 'findWebhookTargetInConversation')
  try {
    const webhooksList = await conversation.webhooks().list()
    return webhooksList.filter((webhook) => webhook.target === target)
  } catch (error: any) {
    const message: string = error.message
    throw new TwilioError(`❌ ~ findWebhooksTargetInConversation ~ ${message}`, { ...error })
  }
}
