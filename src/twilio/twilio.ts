import twilio, { Twilio } from 'twilio'

import { CreateClientOptions } from '../interfaces'
import { ClientTwilioError } from '../common/errors'
import { schemaAuth } from '../common/schemas'
import { validateVariables } from '../common/utils'
import { ERROR_MESSAGES } from '../common/messages'

/**
 * A utility class for managing Twilio clients.
 */
export default class TwilioClient {
  private static client: Twilio | null = null

  /**
   * Private constructor to initialize the Twilio client instance.
   *
   * @param {CreateClientOptions} options - The options to use when creating the client.
   * @param {ContextServerlessTwilio} [options.context] - The Twilio context for serverless execution.
   * @param {string} [options.accountSid] - The Twilio account SID.
   * @param {string} [options.authToken] - The Twilio auth token.
   * @param {object} [options.options] - Additional options to pass to the Twilio constructor.
   * @throws {ClientTwilioError} If the accountSid or authToken are missing or invalid.
   */
  private constructor ({ context, accountSid, authToken, options }: CreateClientOptions) {
    if (TwilioClient.client != null) {
      return
    }

    if (accountSid == null || authToken == null) {
      if (context?.getTwilioClient == null) {
        throw new ClientTwilioError(ERROR_MESSAGES.GET_TWILIO_CLIENT_CONTEXT.MESSAGE, {
          details: ERROR_MESSAGES.GET_TWILIO_CLIENT_CONTEXT.DETAILS
        })
      }
      TwilioClient.client = context.getTwilioClient(options)
      return
    }

    validateVariables(schemaAuth, { accountSid, authToken }, 'createClient')
    TwilioClient.client = twilio(accountSid, authToken, options)
  }

  /**
   * Initializes the Twilio client instance if it has not already been initialized.
   *
   * @param {CreateClientOptions} options - The options to use when creating the client.
   * @returns {TwilioClient} The initialized TwilioClient instance.
   * @throws {ClientTwilioError} If the accountSid or authToken are missing or invalid.
   */
  public static initialize (options: CreateClientOptions) {
    const instance = new TwilioClient(options)
    return instance
  }

  /**
   * Retrieves the Twilio client instance if it exists.
   *
   * @returns {Twilio|null} The Twilio client instance if it exists, otherwise null.
   */
  public static getClient (): Twilio | null {
    return this.client
  }

  /**
   * Resets the Twilio client instance to null.
   */
  resetTwilioClient () {
    TwilioClient.client = null
  }
}
