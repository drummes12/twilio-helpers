import { ConversationContextUpdateOptions, ConversationInstance, ConversationListInstance } from 'twilio/lib/rest/conversations/v1/conversation'
import { ParticipantConversationListInstance, ParticipantConversationListInstanceOptions } from 'twilio/lib/rest/conversations/v1/participantConversation'
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation/message'

import { TwilioError } from '../../common/errors'
import { schemaConversationSid, schemaOptionsUpdateConversation, schemaParticipantConversationListOptions } from '../../common/schemas'
import { validateClientTwilio, validateVariables } from '../../common/utils'
import TwilioClient from '../twilio'
import { createMessageContentInConversation, createMessageInConversation } from './message'
import { ERROR_MESSAGES } from '../../common/messages'
import { CreateContentConversationOptions } from '../../interfaces'

/**
 * Manages Conversations and Messages in Twilio.
 */
export default class ConversationManager {
  private static instance: ConversationManager | null = null
  protected readonly conversationInstance: ConversationListInstance | null = null
  protected readonly participantConversationInstance: ParticipantConversationListInstance | null = null
  protected conversation: ConversationInstance | null = null

  constructor () {
    validateClientTwilio()
    this.conversationInstance = TwilioClient.getClient()?.conversations.v1.conversations ?? null
    this.participantConversationInstance = TwilioClient.getClient()?.conversations.v1.participantConversations ?? null
  }

  /**
   * Gets the singleton instance of the ConversationManager class.
   *
   * @returns {ConversationManager} The ConversationManager instance.
   */
  static getInstance (): ConversationManager {
    if (ConversationManager.instance === null) {
      ConversationManager.instance = new ConversationManager()
    }
    return ConversationManager.instance
  }

  /**
   * Creates a new Conversation.
   *
   * @returns {ConversationInstance|null} The created Conversation instance, or null if there was an error.
   * @throws {TwilioError} If an error occurs during the creation of the Conversation.
   */
  async createConversation () {
    this.conversation = await this.conversationInstance?.create().catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ createConversation ~ ${message}`, { ...error })
    }) ?? null
    return this.conversation
  }

  /**
   * Fetches a Conversation by its SID.
   *
   * @param {string} conversationSid - The SID of the Conversation to fetch.
   * @returns {ConversationInstance|null} The fetched Conversation instance, or null if there was an error.
   * @throws {TwilioError} If an error occurs during the fetch operation.
   */
  async fetchConversation (conversationSid: string) {
    validateVariables(schemaConversationSid.required(), conversationSid, 'fetchConversation')

    this.conversation = await this.conversationInstance?.(conversationSid)
      .fetch()
      .catch((error) => {
        const message: string = error.message
        throw new TwilioError(`❌ ~ fetchConversation ~ ${message}`, { ...error })
      }) ?? null
    console.log(this.conversation?.sid)
    return this.conversation
  }

  /**
   * Updates a Conversation with the provided options.
   *
   * @param {string|ConversationContextUpdateOptions} arg1 - The Conversation SID or update options.
   * @param {ConversationContextUpdateOptions} [arg2] - The update options if the first argument is the Conversation SID.
   * @returns {ConversationInstance|null} The updated Conversation instance, or null if there was an error.
   * @throws {TwilioError} If an error occurs during the update operation.
   */
  async updateConversation (arg1: string | ConversationContextUpdateOptions, arg2?: ConversationContextUpdateOptions) {
    let conversationSid: string | undefined
    let options: ConversationContextUpdateOptions | object

    if (typeof arg1 === 'string') {
      conversationSid = arg1
      options = arg2 ?? {}
    } else {
      options = arg1
    }

    validateVariables(schemaOptionsUpdateConversation.required(), options, 'updateConversation')

    if (conversationSid == null && this.conversation != null) {
      this.conversation = await this.conversation.update(options).catch((error) => {
        const message: string = error.message
        throw new TwilioError(`❌ ~ updateConversation ~ ${message}`, { ...error })
      }) ?? null
      return this.conversation
    }

    validateVariables(schemaConversationSid.required(), conversationSid, 'updateConversation')

    this.conversation = await this.conversationInstance?.(conversationSid ?? '')?.update(options)
      .catch((error) => {
        const message: string = error.message
        throw new TwilioError(`❌ ~ updateConversation ~ ${message}`, { ...error })
      }) ?? null
    return this.conversation
  }

  /**
   * Deletes a Conversation by its SID.
   *
   * @param {string} conversationSid - The SID of the Conversation to delete.
   * @returns {ConversationInstance|null} The deleted Conversation instance, or null if there was an error.
   * @throws {TwilioError} If an error occurs during the delete operation.
   */
  async deleteConversation (conversationSid: string) {
    if (conversationSid == null && this.conversation != null) {
      await this.conversation?.remove().catch((error) => {
        const message: string = error.message
        throw new TwilioError(`❌ ~ deleteConversation ~ ${message}`, { ...error })
      })
      this.conversation = null
      return this.conversation
    }

    validateVariables(schemaConversationSid.required(), conversationSid, 'deleteConversation')

    await this.conversationInstance?.(conversationSid)
      .remove()
      .catch((error) => {
        const message: string = error.message
        throw new TwilioError(`❌ ~ deleteConversation ~ ${message}`, { ...error })
      })
    this.conversation = null
    return this.conversation
  }

  /**
   * Lists Participant Conversations with the provided options.
   *
   * @param {ParticipantConversationListInstanceOptions} listOptions - The options to filter the list of Participant Conversations.
   * @returns {ParticipantConversationListInstance|null} The list of Participant Conversations, or null if there was an error.
   * @throws {TwilioError} If an error occurs during the listing operation.
   */
  async listConversationByParticipant (listOptions: ParticipantConversationListInstanceOptions) {
    validateVariables(schemaParticipantConversationListOptions.required(), listOptions, 'listConversationByParticipant')

    return await this.participantConversationInstance?.list(listOptions).catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ listConversationByParticipant ~ ${message}`, { ...error })
    }) ?? null
  }

  /**
   * Creates a new Message in the current Conversation.
   *
   * @param {MessageListInstanceCreateOptions} options - The options to create the Message.
   * @returns {Promise<MessageInstance>} The created Message instance.
   * @throws {TwilioError} If there is no current Conversation or an error occurs during the creation.
   */
  async createMessage (options: MessageListInstanceCreateOptions) {
    if (this.conversation == null) {
      throw new TwilioError(ERROR_MESSAGES.CONVERSATION_NOT_FOUND.MESSAGE, {
        status: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.STATUS,
        code: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.CODE,
        moreInfo: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.MORE_INFO,
        details: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.DETAILS
      })
    }
    return await createMessageInConversation(this.conversation, options)
  }

  /**
   * Creates a new Message Content in the current Conversation.
   *
   * @param {CreateContentConversationOptions} options - The options to create the Message Content.
   * @returns {Promise<MessageInstance>} The created Message instance.
   * @throws {TwilioError} If there is no current Conversation or an error occurs during the creation.
   */
  async createMessageContent (options: CreateContentConversationOptions) {
    if (this.conversation == null) {
      throw new TwilioError(ERROR_MESSAGES.CONVERSATION_NOT_FOUND.MESSAGE, {
        status: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.STATUS,
        code: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.CODE,
        moreInfo: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.MORE_INFO,
        details: ERROR_MESSAGES.CONVERSATION_NOT_FOUND.DETAILS
      })
    }
    return await createMessageContentInConversation(this.conversation, options)
  }
}
