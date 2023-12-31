import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/service/conversation'

import { CreateParticipantOptions, ParticipantOptions } from '../../interfaces'
import { schemaAddress, schemaAddresses, schemaConversation } from '../../common/schemas'
import { accumulateWithPaginator, validateClientTwilio, validateVariables } from '../../common/utils'
import { TwilioError } from '../../common/errors'
import { client } from '../twilio'
import { ParticipantConversationInstance } from 'twilio/lib/rest/conversations/v1/service/participantConversation'

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
export async function addParticipantInConversation (
  conversation: ConversationInstance,
  { address, proxyAddress, identity, attributes }: CreateParticipantOptions
) {
  validateVariables(schemaConversation.required(), conversation, 'addParticipantInConversation')
  const participantData = {
    'messagingBinding.address': address,
    'messagingBinding.proxyAddress': proxyAddress,
    identity,
    attributes
  }
  return await conversation
    .participants()
    .create(participantData)
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ addParticipantInConversation ~ ${message}`, { ...error })
    })
}
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
export async function removeParticipantInConversation (
  conversation: ConversationInstance,
  { address, proxyAddress, identity }: ParticipantOptions
) {
  validateVariables(schemaConversation.required(), conversation, 'removeParticipantInConversation')
  try {
    const participants = await conversation.participants()
    const participantsAll = await participants.list()
    const participantToEliminated = participantsAll.find(
      (participant) =>
        participant.messagingBinding != null &&
        ((participant.messagingBinding.proxy_address === proxyAddress &&
          participant.messagingBinding.address === address) ||
          participant.identity === identity)
    )
    if (participantToEliminated == null) return false
    return await participantToEliminated.remove()
  } catch (error: any) {
    const message: string = error.message
    throw new TwilioError(`❌ ~ removeParticipantInConversation ~ ${message}`, { ...error })
  }
}

/**
 * This function checks if there is at least one participant with a defined identity in a given
 * conversation.
 *
 * @example
 * const hasAgentAssigned = await checkAgentInConversation(conversation)
 */
export async function checkAgentInConversation (conversation: ConversationInstance) {
  validateVariables(schemaConversation.required(), conversation, 'checkAgentInConversation')
  return await conversation
    .participants()
    .list()
    .then((participants) => participants.some((participant) => participant?.identity != null))
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ checkAgentInConversation ~ ${message}`, { ...error })
    })
}

/**
 * This function retrieves all conversations in which a participant with a given address is involved.{
 *
 * @example
 * const conversations = await getConversationsByParticipantAddress('whatsapp:+1234567890')
 */
export function getConversationsByParticipantAddress (
  address: string
): Promise<ParticipantConversationInstance[]> | undefined {
  validateClientTwilio()
  validateVariables(schemaAddress, address, 'getConversationActiveByParticipant')
  return client?.conversations.v1.participantConversations
    .page({ address })
    .then((page) => accumulateWithPaginator(page, []))
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getConversationsByParticipantAddress ~ ${message}`, { ...error })
    })
}

/**
 * This function retrieves an active conversation by the address and proxy address of a participant.
 *
 * @example
 * const conversationActive = await getConversationActiveByParticipant({
 *  address: 'whatsapp:+1234567890',
 *  proxyAddress: 'whatsapp:+1234567890'
 * })
 */
export async function getConversationActiveByAddressParticipant ({
  address,
  proxyAddress
}: {
  address: string
  proxyAddress: string
}) {
  validateVariables(schemaAddresses, { address, proxyAddress }, 'getConversationActiveByParticipant')
  const participantConversations = await getConversationsByParticipantAddress(address)
  const conversation = participantConversations?.find(
    (conversation) =>
      conversation.conversationState === 'active' &&
      conversation.participantMessagingBinding.proxy_address === proxyAddress
  )
  return (conversation != null) || null
}
