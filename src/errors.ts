import { CompleteErrorDetails, SimpleErrorDetails } from './types'

export class ClientTwilioError extends Error {
  public status: number
  public details: string

  constructor (message: string, { status = 401, details = '' }: SimpleErrorDetails) {
    super(message)
    this.name = 'ClientTwilioError'
    this.status = status
    this.details = details
  }
}

export class TwilioError extends Error {
  public status: number
  public code: string
  public more_info: string
  public details: string

  constructor (message: string, { status, code, moreInfo, details }: CompleteErrorDetails) {
    super(message)
    this.name = 'TwilioError'
    this.status = status
    this.code = code
    this.more_info = moreInfo
    this.details = details
  }
}

export class ValidationError extends Error {
  public status: number
  public details: string

  constructor (message: string, { status = 428, details = '' }: SimpleErrorDetails) {
    super(message)
    this.name = 'ValidationError'
    this.status = status
    this.details = details
  }
}

export class HelperError extends Error {
  public status: number
  public code: string
  public more_info: string
  public details: string

  constructor (message: string, { status, code, moreInfo, details }: CompleteErrorDetails) {
    super(message)
    this.name = 'HelperError'
    this.status = status
    this.code = code
    this.more_info = moreInfo
    this.details = details
  }
}
