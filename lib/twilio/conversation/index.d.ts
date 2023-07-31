/**
 * Creates a new conversation.
 *
 * @example
 * const conversation = await createConversation()
 */
export declare function createConversation(): Promise<import("twilio/lib/rest/conversations/v1/conversation").ConversationInstance | undefined>;
/**
 * This function fetches a conversation using its unique identifier and returns a promise that resolves
 * with the conversation object.
 *
 * @example
 * const conversation = await fetchConversation('CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export declare function fetchConversation(conversationSid: string): Promise<import("twilio/lib/rest/conversations/v1/conversation").ConversationInstance | undefined>;
export * as message from './message';
export * as participants from './participant';
export * as webhook from './webhook';
