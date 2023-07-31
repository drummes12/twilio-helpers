import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import { CreateWebhookOptions } from '../../types';
import { WebhookTarget } from 'twilio/lib/rest/conversations/v1/conversation/webhook';
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
export declare function addWebhookInConversation(conversation: ConversationInstance, { method, filters, triggers, url, target, flowSid }: CreateWebhookOptions): Promise<import("twilio/lib/rest/conversations/v1/conversation/webhook").WebhookInstance>;
/**
 * This function updates a webhook in a conversation to target a specific Studio flow.
 *
 * @example
 * const conversations = await findWebhooksTargetInConversation(conversation, {
 *  target: 'studio'
 * })
 */
export declare function findWebhooksTargetInConversation(conversation: ConversationInstance, target: WebhookTarget): Promise<import("twilio/lib/rest/conversations/v1/conversation/webhook").WebhookInstance[]>;
