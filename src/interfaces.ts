import { Twilio, ClientOpts } from 'twilio'
import Page, { TwilioResponsePayload } from 'twilio/lib/base/Page'
import Version from 'twilio/lib/base/Version'
import { WebhookMethod, WebhookTarget } from 'twilio/lib/rest/conversations/v1/conversation/webhook'

export interface ContextServerlessTwilio {
  getTwilioClient?: (options?: ClientOpts) => Twilio
  DOMAIN_NAME: string
  PATH: string
  SERVICE_SID: string | undefined
  ENVIRONMENT_SID: string | undefined
}

export interface CreateClientOptions {
  accountSid?: string
  authToken?: string
  options?: ClientOpts
}

export interface Content {
  sid: string
  variables: { [key: number]: string }
}

export interface ParticipantOptions {
  address?: string
  proxyAddress?: string
  identity?: string
}

export interface CreateParticipantOptions extends ParticipantOptions {
  attributes?: string
}

export interface CreateWebhookOptions {
  target: WebhookTarget
  method?: WebhookMethod
  filters?: string[]
  triggers?: string[]
  url?: string
  flowSid?: string
}

export interface CreateExecutionStudioFlowOptions {
  to: string
  from: string
  parameters?: object
}

export interface CreateSyncMapItemOptions {
  key: string
  data: object
  itemTtl?: number
}

export interface SimpleErrorDetails {
  status?: number
  details?: string
}

export interface CompleteErrorDetails {
  status: number
  code: string
  moreInfo: string
  details: string
}

export type Paginator = Page<Version, TwilioResponsePayload, any, any>

export interface HeadersResponse {
  [key: string]: string
}
