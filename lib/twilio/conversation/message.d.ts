import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation/message';
import { Content } from '../../types';
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
export declare function createMessageInConversation(conversation: ConversationInstance, { author, body }: MessageListInstanceCreateOptions): Promise<import("twilio/lib/rest/conversations/v1/conversation/message").MessageInstance>;
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
export declare function createMessageContentInConversation(conversation: ConversationInstance, { author, content }: {
    author: string;
    content: Content;
}): Promise<import("twilio/lib/rest/conversations/v1/conversation/message").MessageInstance>;
