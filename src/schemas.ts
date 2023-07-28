import Joi from 'joi'
import { SID, REGEX_SID } from './consts'

export const schemaSid = (initialSid: string) => Joi.string().pattern(REGEX_SID(initialSid))

/** SCHEMAS SID */
export const schemaAccoundSid = schemaSid(SID.account.initial).label(SID.account.label)
export const schemaAuthToken = schemaSid(SID.authToken.initial).label(SID.authToken.label)
export const schemaConversationSid = schemaSid(SID.conversation.initial).label(SID.conversation.label)
export const schemaContentSid = schemaSid(SID.content.initial).label(SID.content.label)
export const schemaStudioFlowSid = schemaSid(SID.studioFlow.initial).label(SID.studioFlow.label)
export const schemaSyncServiceSid = schemaSid(SID.syncService.initial).label(SID.syncService.label)
export const schemaSyncMapSid = schemaSid(SID.syncMap.initial).label(SID.syncMap.label)

export const schemaResponse = Joi.object({
  statusCode: Joi.number().required(),
  body: Joi.object(),
}).required()

export const schemaAuth = Joi.object({
  accountSid: schemaAccoundSid.required(),
  authToken: schemaAuthToken.required()
}).required()
