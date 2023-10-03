import twilio, { Twilio } from 'twilio'

import { ContextServerlessTwilio, CreateClientOptions } from '../interfaces'

import { ClientTwilioError } from '../common/errors'
import { schemaAuth } from '../common/schemas'
import { validateVariables } from '../common/utils'
import { ERROR_MESSAGES } from '../common/messages'

/**
 * A utility class for managing Twilio clients.
 */
export class TwilioClient {
  private client: Twilio | null = null

  /**
   * Creates a new instance of the TwilioClient class.
   *
   * @param {ContextServerlessTwilio} context - The Twilio context for serverless execution.
   */
  constructor (private readonly context: ContextServerlessTwilio) {}

  /**
   * Creates a new Twilio client instance.
   *
   * @param {CreateClientOptions} options - The options to use when creating the client.
   * @param {string} options.accountSid - The Twilio account SID.
   * @param {string} options.authToken - The Twilio auth token.
   * @param {object} [options.options] - Additional options to pass to the Twilio constructor.
   * @returns {Twilio|null} The newly created Twilio client instance, or null if the accountSid and authToken were not provided.
   * @throws {ClientTwilioError} If the accountSid or authToken are missing or invalid.
   *
   * @example
   * const twilioClient = new TwilioClient(context);
   * const client = twilioClient.createClient({
   *   accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *   authToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *   options: {
   *     region: 'us-east-1',
   *   },
   * });
   */
  createClient ({ accountSid, authToken, options }: CreateClientOptions): Twilio | null {
    if (accountSid == null || authToken == null) {
      if (this.context?.getTwilioClient == null) {
        throw new ClientTwilioError(ERROR_MESSAGES.GET_TWILIO_CLIENT.MESSAGE, {
          details: ERROR_MESSAGES.GET_TWILIO_CLIENT.DETAILS
        })
      }
      this.client = this.context.getTwilioClient(options)
      return this.client
    }

    validateVariables(schemaAuth, { accountSid, authToken }, 'createClient')
    this.client = twilio(accountSid, authToken, options)
    return this.client
  }

  /**
   * Resets the Twilio client instance to null.
   */
  resetTwilioClient () {
    this.client = null
  }
}
