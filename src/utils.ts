import '@twilio-labs/serverless-runtime-types'
import { Schema, isSchema } from 'joi'

import { CompleteErrorDetails, HeadersResponse, Paginator, SimpleErrorDetails } from './types'

import { ClientTwilioError, ValidationError } from './errors'
import { schemaResponse } from './schemas'
import { client } from './twilio/twilio'

/**
 * Validates the Twilio client and ensures that it is initialized.
 * Throws a ClientTwilioError if the client is not found or not initialized.
 */
export function validateClientTwilio () {
  if (client == null) {
    throw new ClientTwilioError('❌ ~ Twilio client not found', {
      details: `The Twilio client is not initialized. Please provide the accountSid and authToken to initialize the client as follows:
createClient({ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" })
or
createClient({ context })`
    })
  }
}

/**
 * This function checks if any of the variables in an array are undefined, and throws an error with a message
 * if so.
 *
 * @example
 * try {
 *  validateVariables(Joi.object(), {}, 'testFunction')
 * } catch (e) {
 *  console.error(e.message)
 * }
 */
export function validateVariables (schema: Schema, data: unknown, functionName = '') {
  if (!isSchema(schema)) {
    throw new ValidationError(`❌ ~ ${functionName} ~ Required schema not provided`, {
      details: 'First parameter must be a schema'
    })
  }
  const result = schema.validate(data)
  const { error } = result
  if (error != null) {
    throw new ValidationError(`❌ ~ ${functionName} ~ Required parameter not provided`, {
      details: error.message
    })
  }
}

/**
 * Accumulate items from a paginated response.
 *
 * @example
 * const allConversationOfAddress = await client.conversations.v1.participantConversations
 *  .page({ address })
 *  .then((page) => accumulateWithPaginator(page, [], 'instances'))
 *
 * @example
 * const allConversationOfAddress = await client.conversations.v1.participantConversations
 *  .page({ address })
 *  .then((page) => accumulateWithPaginator(page))
 */
export function accumulateWithPaginator (paginator: Paginator, accumulator: object[] = []): any {
  const items = paginator?.instances

  if (items === null) return []

  accumulator.push(...items)

  return (paginator?.getNextPageUrl() != null)
    ? paginator.nextPage()?.then((page) => accumulateWithPaginator(page, accumulator))
    : accumulator
}

/**
 * Creates a Twilio Response object with the given status code, body and headers.
 *
 * @example
 * callback(null, createResponse(200, { success: true }))
 *
 * @example
 * callback(null, createResponse(400, { success: false, error: new Error() }))
 *
 * @example
 * const headers = {
 *  'Access-Control-Allow-Origin': '*',
 *  'Access-Control-Allow-Methods': 'PATCH, PUT',
 * }
 * callback(null, createResponse(200, { success:true }, headers))
 */
export function createResponse (statusCode: number, body = {}, headers?: HeadersResponse) {
  validateVariables(schemaResponse, { statusCode, body }, 'createResponse')

  const response = new Twilio.Response()

  if (headers == null) {
    response.appendHeader('Access-Control-Allow-Origin', '*')
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.appendHeader('Content-Type', 'application/json')
  } else {
    Object.keys(headers).forEach((key) => {
      response.appendHeader(key, headers[key])
    })
  }
  response.setStatusCode(statusCode)
  response.setBody(body)
  return response
}

/**
 * Function to handle and format errors caught in try-catch blocks of asynchronous functions
 *
 * @example
 * try {
 *  // Logic
 * }
 * catch (error) {
 *  const { codeStatus, body } = responseCatchError(error)
 *  callback(null, createResponse(codeStatus, body))
 * }
 */
export function responseCatchError (error: CompleteErrorDetails | SimpleErrorDetails = {}) {
  const { status = 400 } = error
  const success = false

  const body = { success, ...error }
  const codeStatus = status

  return { codeStatus, body }
}
