"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageContentInConversation = exports.createMessageInConversation = void 0;
const utils_1 = require("../../utils");
const schemas_1 = require("../../schemas");
const errors_1 = require("../../errors");
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
async function createMessageInConversation(conversation, { author, body }) {
    (0, utils_1.validateVariables)(schemas_1.schemaMessageConversation, { conversation, options: { author, body } }, 'createMessageInConversation');
    return await conversation
        .messages()
        .create({ author, body })
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createMessageInConversation ~ ${message}`, { ...error });
    });
}
exports.createMessageInConversation = createMessageInConversation;
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
async function createMessageContentInConversation(conversation, { author, content }) {
    (0, utils_1.validateVariables)(schemas_1.schemaMessageContentConversation, { conversation, options: { author, content } }, 'createMessageContentInConversation');
    return await conversation
        .messages()
        .create({
        author,
        contentSid: content.sid,
        contentVariables: JSON.stringify(content.variables)
    })
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createMessageContentInConversation ~ ${message}`, { ...error });
    });
}
exports.createMessageContentInConversation = createMessageContentInConversation;
