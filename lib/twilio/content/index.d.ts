import { ContentInstance } from 'twilio/lib/rest/content/v1/content';
/**
 * This function retrieves a list of contents from the Twilio API and throws an error if no contents
 * are found.
 *
 * @example
 * const allContents = await getContents()
 */
export declare function getContents(): Promise<ContentInstance[]>;
/**
 * Retrieves the Content object that matches the specified SID
 *
 * @example
 * const content = await getContentsBySid('HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export declare function getContentsBySid(contentSid: string): Promise<ContentInstance | undefined>;
/**
 * Retrieves the Content object that matches the specified name
 *
 * @example
 * const content = await getContentByName('template-name')
 */
export declare function getContentByName(contentName: string): Promise<ContentInstance | undefined>;
