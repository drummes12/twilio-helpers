import { ContentInstance } from 'twilio/lib/rest/content/v1/content'
import { TwilioError } from '../../common/errors'
import { schemaContentSid, schemaString } from '../../common/schemas'
import { accumulateWithPaginator, validateClientTwilio, validateVariables } from '../../common/utils'
import { client } from '../twilio'

/**
 * This function retrieves a list of contents from the Twilio API and throws an error if no contents
 * are found.
 *
 * @example
 * const allContents = await getContents()
 */
export async function getContents (): Promise<ContentInstance[]> {
  validateClientTwilio()
  const contentsList: ContentInstance[] | [] = await client?.content.v1.contents
    .page()
    .then((page) => accumulateWithPaginator(page, []))
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getContents ~ ${message}`, { ...error })
    })
  if (contentsList.length === 0) {
    throw new TwilioError('❌ ~ getContents ~ Contents not found.', {
      status: 404,
      code: 'CONTENTS_NOT_FOUND',
      moreInfo: 'https://www.twilio.com/docs/content-editor/overview',
      details:
        'You not have content created in your twilio console, you can validate it in: https://console.twilio.com/us1/develop/sms/content-editor'
    })
  }
  return contentsList
}

/**
 * Retrieves the Content object that matches the specified SID
 *
 * @example
 * const content = await getContentsBySid('HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export async function getContentsBySid (contentSid: string) {
  validateVariables(schemaContentSid.required(), contentSid, 'getContentsBySid')
  return await client?.content.v1.contents
    .get(contentSid)
    .fetch()
    .catch((error) => {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getContentsBySid ~ ${message}`, { ...error })
    })
}

/**
 * Retrieves the Content object that matches the specified name
 *
 * @example
 * const content = await getContentByName('template-name')
 */
export async function getContentByName (contentName: string) {
  validateVariables(schemaString.required(), contentName, 'getContentByName')
  const contentsList = await getContents()
  return contentsList.find((content) => content.friendlyName === contentName)
}
