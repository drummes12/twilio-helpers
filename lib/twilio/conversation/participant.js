"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationActiveByAddressParticipant = exports.getConversationsByParticipantAddress = exports.checkAgentInConversation = exports.removeParticipantInConversation = exports.addParticipantInConversation = void 0;
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
const errors_1 = require("../../errors");
const twilio_1 = require("../twilio");
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
async function addParticipantInConversation(conversation, { address, proxyAddress, identity, attributes }) {
    (0, utils_1.validateVariables)(schemas_1.schemaConversation.required(), conversation, 'addParticipantInConversation');
    const participantData = {
        'messagingBinding.address': address,
        'messagingBinding.proxyAddress': proxyAddress,
        identity,
        attributes
    };
    return await conversation
        .participants()
        .create(participantData)
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ addParticipantInConversation ~ ${message}`, { ...error });
    });
}
exports.addParticipantInConversation = addParticipantInConversation;
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
async function removeParticipantInConversation(conversation, { address, proxyAddress, identity }) {
    (0, utils_1.validateVariables)(schemas_1.schemaConversation.required(), conversation, 'removeParticipantInConversation');
    try {
        const participants = await conversation.participants();
        const participantsAll = await participants.list();
        const participantToEliminated = participantsAll.find((participant) => participant.messagingBinding != null &&
            ((participant.messagingBinding.proxy_address === proxyAddress &&
                participant.messagingBinding.address === address) ||
                participant.identity === identity));
        if (participantToEliminated == null)
            return false;
        return await participantToEliminated.remove();
    }
    catch (error) {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ removeParticipantInConversation ~ ${message}`, { ...error });
    }
}
exports.removeParticipantInConversation = removeParticipantInConversation;
/**
 * This function checks if there is at least one participant with a defined identity in a given
 * conversation.
 *
 * @example
 * const hasAgentAssigned = await checkAgentInConversation(conversation)
 */
async function checkAgentInConversation(conversation) {
    (0, utils_1.validateVariables)(schemas_1.schemaConversation.required(), conversation, 'checkAgentInConversation');
    return await conversation
        .participants()
        .list()
        .then((participants) => participants.some((participant) => participant?.identity != null))
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ checkAgentInConversation ~ ${message}`, { ...error });
    });
}
exports.checkAgentInConversation = checkAgentInConversation;
/**
 * This function retrieves all conversations in which a participant with a given address is involved.{
 *
 * @example
 * const conversations = await getConversationsByParticipantAddress('whatsapp:+1234567890')
 */
function getConversationsByParticipantAddress(address) {
    (0, utils_1.validateClientTwilio)();
    (0, utils_1.validateVariables)(schemas_1.schemaAddress, address, 'getConversationActiveByParticipant');
    return twilio_1.client?.conversations.v1.participantConversations
        .page({ address })
        .then((page) => (0, utils_1.accumulateWithPaginator)(page, []))
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ getConversationsByParticipantAddress ~ ${message}`, { ...error });
    });
}
exports.getConversationsByParticipantAddress = getConversationsByParticipantAddress;
/**
 * This function retrieves an active conversation by the address and proxy address of a participant.
 *
 * @example
 * const conversationActive = await getConversationActiveByParticipant({
 *  address: 'whatsapp:+1234567890',
 *  proxyAddress: 'whatsapp:+1234567890'
 * })
 */
async function getConversationActiveByAddressParticipant({ address, proxyAddress }) {
    (0, utils_1.validateVariables)(schemas_1.schemaAddresses, { address, proxyAddress }, 'getConversationActiveByParticipant');
    const participantConversations = await getConversationsByParticipantAddress(address);
    const conversation = participantConversations?.find((conversation) => conversation.conversationState === 'active' &&
        conversation.participantMessagingBinding.proxy_address === proxyAddress);
    return (conversation != null) || null;
}
exports.getConversationActiveByAddressParticipant = getConversationActiveByAddressParticipant;
