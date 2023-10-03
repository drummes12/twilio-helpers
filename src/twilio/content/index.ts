import { ContentInstance, ContentListInstance } from 'twilio/lib/rest/content/v1/content'
import { TwilioError } from '../../common/errors'
import { schemaContentSid, schemaString } from '../../common/schemas'
import { accumulateWithPaginator, validateClientTwilio, validateVariables } from '../../common/utils'
import TwilioClient from '../twilio'
import { ERROR_MESSAGES } from '../../common/messages'

export default class ContentManager {
  private static instance: ContentManager | null = null
  private readonly contentInstance: ContentListInstance | null = null

  private constructor () {
    validateClientTwilio()
    this.contentInstance = TwilioClient.getClient()?.content.v1.contents ?? null
  }

  static getInstance (): ContentManager {
    if (ContentManager.instance === null) {
      ContentManager.instance = new ContentManager()
    }
    return ContentManager.instance
  }

  async getContents (): Promise<ContentInstance[]> {
    try {
      const page = await this.contentInstance?.page()
      const contentsList: ContentInstance[] = await accumulateWithPaginator(page, [])

      if (contentsList.length === 0) {
        throw new TwilioError(ERROR_MESSAGES.CONTENTS_NOT_FOUND.MESSAGE, {
          status: ERROR_MESSAGES.CONTENTS_NOT_FOUND.STATUS,
          code: ERROR_MESSAGES.CONTENTS_NOT_FOUND.CODE,
          moreInfo: ERROR_MESSAGES.CONTENTS_NOT_FOUND.MORE_INFO,
          details: ERROR_MESSAGES.CONTENTS_NOT_FOUND.DETAILS
        })
      }

      return contentsList
    } catch (error: any) {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getContents ~ ${message}`, { ...error })
    }
  }

  async getContentsBySid (contentSid: string) {
    validateVariables(schemaContentSid.required(), contentSid, 'getContentsBySid')

    try {
      return await this.contentInstance?.get(contentSid).fetch()
    } catch (error: any) {
      const message: string = error.message
      throw new TwilioError(`❌ ~ getContentsBySid ~ ${message}`, { ...error })
    }
  }

  async getContentByName (contentName: string) {
    validateVariables(schemaString.required(), contentName, 'getContentByName')
    const contentsList = await this.getContents()
    return contentsList.find((content) => content.friendlyName === contentName)
  }
}
