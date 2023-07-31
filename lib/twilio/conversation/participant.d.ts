import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/service/conversation';
import { CreateParticipantOptions, ParticipantOptions } from '../../types';
import { ParticipantConversationInstance } from 'twilio/lib/rest/conversations/v1/service/participantConversation';
/**
 * This function adds a participant to a conversation.
 *
 * @example
 * const participant = await addParticipantInConversation(conversation, {
 *  address: 'whatsapp:+1234567890',
 *  proxyAddress: 'whatsapp:+1234567890'
 * })
 *
 * @example
 * const participant = await addParticipantInConversation(conversation, {
 *  identity: 'johndoe',
 * })
 */
export declare function addParticipantInConversation(conversation: ConversationInstance, { address, proxyAddress, identity, attributes }: CreateParticipantOptions): Promise<import("twilio/lib/rest/conversations/v1/service/conversation/participant").ParticipantInstance>;
/**
 * This function remove a participant to a conversation.
 *
 * @example
 * const wasRemoved = await removeParticipantInConversation(conversation, {
 *  address: 'whatsapp:+1234567890',
 *  proxyAddress: 'whatsapp:+1234567890'
 * })
 *
 * @example
 * const wasRemoved = await addParticipantInConversation(conversation, {
 *  identity: 'johndoe',
 * })
 */
export declare function removeParticipantInConversation(conversation: ConversationInstance, { address, proxyAddress, identity }: ParticipantOptions): Promise<boolean>;
/**
 * This function checks if there is at least one participant with a defined identity in a given
 * conversation.
 *
 * @example
 * const hasAgentAssigned = await checkAgentInConversation(conversation)
 */
export declare function checkAgentInConversation(conversation: ConversationInstance): Promise<boolean>;
/**
 * This function retrieves all conversations in which a participant with a given address is involved.{
 *
 * @example
 * const conversations = await getConversationsByParticipantAddress('whatsapp:+1234567890')
 */
export declare function getConversationsByParticipantAddress(address: string): Promise<ParticipantConversationInstance[]> | undefined;
/**
 * This function retrieves an active conversation by the address and proxy address of a participant.
 *
 * @example
 * const conversationActive = await getConversationActiveByParticipant({
 *  address: 'whatsapp:+1234567890',
 *  proxyAddress: 'whatsapp:+1234567890'
 * })
 */
export declare function getConversationActiveByAddressParticipant({ address, proxyAddress }: {
    address: string;
    proxyAddress: string;
}): Promise<true | null>;
