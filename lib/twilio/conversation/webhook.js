"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWebhooksTargetInConversation = exports.addWebhookInConversation = void 0;
const utils_1 = require("../../utils");
const schemas_1 = require("../../schemas");
const errors_1 = require("../../errors");
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
async function addWebhookInConversation(conversation, { method = 'POST', filters, triggers, url, target, flowSid }) {
    (0, utils_1.validateVariables)(schemas_1.schemaWebhookConversation, { conversation, options: { method, filters, triggers, url, target, flowSid } }, 'addWebhookInConversation');
    const configurationWebhook = {
        'configuration.method': method,
        'configuration.filters': filters,
        'configuration.triggers': triggers,
        'configuration.flowSid': flowSid,
        'configuration.url': url,
        target
    };
    return await conversation
        .webhooks()
        .create(configurationWebhook)
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ addWebhookInConversation ~ ${message}`, { ...error });
    });
}
exports.addWebhookInConversation = addWebhookInConversation;
/**
 * This function updates a webhook in a conversation to target a specific Studio flow.
 *
 * @example
 * const conversations = await findWebhooksTargetInConversation(conversation, {
 *  target: 'studio'
 * })
 */
async function findWebhooksTargetInConversation(conversation, target) {
    (0, utils_1.validateVariables)(schemas_1.schemaFindWebhookTargetConversation, { conversation, target }, 'findWebhookTargetInConversation');
    try {
        const webhooksList = await conversation.webhooks().list();
        return webhooksList.filter((webhook) => webhook.target === target);
    }
    catch (error) {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ findWebhooksTargetInConversation ~ ${message}`, { ...error });
    }
}
exports.findWebhooksTargetInConversation = findWebhooksTargetInConversation;
