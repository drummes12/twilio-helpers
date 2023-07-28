import { Context } from '@twilio-labs/serverless-runtime-types/types'
import { ClientOpts } from 'twilio'

export type SimpleErrorDetails = {
  status?: number
  details?: string
}

export type CompleteErrorDetails = {
  status: number
  code: string
  moreInfo: string
  details: string
}

export interface Paginator {
  instances: object[] | null
  getNextPageUrl?: () => string | null
  nextPage: () => Promise<Paginator>
}

export interface HeadersResponse {
  [key: string]: string
}

export type CreateClient = {
  context?: Context
  accountSid: string
  authToken: string
  options?: ClientOpts
}
