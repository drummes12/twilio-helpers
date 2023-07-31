import { Twilio } from 'twilio';
import { CreateClientOptions } from '../types';
declare let client: Twilio | null;
/**
 * This function createClient creates a Twilio client instance either using the provided accountSid and
 * authToken or by retrieving an existing client from the context object. It returns the Twilio client
 * instance that can be used to interact with Twilio APIs.
 *
 * @example
 * const client = createClient({
 *  accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  authToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *  options: {}
 * )
 *
 * @example
 * const client = createClient({ context: { getTwilioClient: serverlessTwilio }})
 */
export declare function createClient({ context, accountSid, authToken, options }: CreateClientOptions): Twilio | null;
/**
 * @private
 * @description This function is used internally in the tests and its use is not recommended.
 * Resets the Twilio client by assigning it the value `null`.
 */
export declare function _resetTwilioClient(): void;
export { client };
