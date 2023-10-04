import Joi from 'joi'
import { WEBHOOK_POST_ACTION, SID, WEBHOOK_METHOD, WEBHOOK_TARGET, REGEX_SID, REGEX_ADDRESS } from './consts'

export const schemaSid = (initialSid: string) => Joi.string().pattern(REGEX_SID(initialSid))

/** SCHEMAS SID */
export const schemaAccoundSid = schemaSid(SID.account.initial).label(SID.account.label)
export const schemaAuthToken = schemaSid(SID.authToken.initial).label(SID.authToken.label)
export const schemaConversationSid = schemaSid(SID.conversation.initial).label(SID.conversation.label)
export const schemaContentSid = schemaSid(SID.content.initial).label(SID.content.label)
export const schemaStudioFlowSid = schemaSid(SID.studioFlow.initial).label(SID.studioFlow.label)
export const schemaSyncServiceSid = schemaSid(SID.syncService.initial).label(SID.syncService.label)
export const schemaWorkspaceSid = schemaSid(SID.workspace.initial).label(SID.workspace.label)
export const schemaTaskSid = schemaSid(SID.task.initial).label(SID.task.label)
export const schemaWorkerSid = schemaSid(SID.worker.initial).label(SID.worker.label)
export const schemaSyncMapSid = schemaSid(SID.syncMap.initial).label(SID.syncMap.label)

/** SCHEMAS BASE */
export const schemaString = Joi.string()

/** SCHEMAS BASE TWILIO */
export const schemaAddress = Joi.string().pattern(REGEX_ADDRESS).strict()

export const schemaResponse = Joi.object({
  statusCode: Joi.number().required(),
  body: Joi.object()
}).required()

export const schemaAuth = Joi.object({
  accountSid: schemaAccoundSid.required(),
  authToken: schemaAuthToken.required()
}).required()

export const schemaConversation = Joi.object({
  sid: schemaConversationSid.required()
})
  .min(2)
  .unknown(true)
  .required()

export const schemaStudioFlow = Joi.object({
  sid: schemaStudioFlowSid.required()
})
  .min(2)
  .unknown(true)
  .required()

export const schemaSyncService = Joi.object({
  _solution: Joi.object({
    sid: schemaSyncServiceSid.required()
  }).required()
})
  .min(2)
  .unknown(true)
  .required()

export const schemaWorkspace = Joi.object({
  _solution: Joi.object({
    sid: schemaWorkspaceSid.required()
  }).required()
})
  .min(2)
  .unknown(true)
  .required()

export const schemaSyncMap = Joi.object({
  sid: schemaSyncMapSid.required(),
  uniqueName: Joi.string().required()
})
  .min(2)
  .unknown(true)
  .required()

/** SCHEMAS FUNCTIONS */
export const schemaWebhookConversation = Joi.object({
  conversation: schemaConversation.required(),
  options: Joi.object({
    method: Joi.string().valid(...WEBHOOK_METHOD),
    filters: Joi.array()
      .items(Joi.string().valid(...WEBHOOK_POST_ACTION))
      .min(1),
    triggers: Joi.array().items(Joi.string()).min(1),
    url: Joi.string().uri(),
    target: Joi.string()
      .valid(...WEBHOOK_TARGET)
      .required(),
    flowSid: schemaStudioFlowSid
  }).required()
}).required()

export const schemaFindWebhookTargetConversation = Joi.object({
  conversation: schemaConversation.required(),
  target: Joi.string()
    .valid(...WEBHOOK_TARGET)
    .required()
}).required()

export const schemaMessageConversation = Joi.object({
  conversation: schemaConversation.required(),
  options: Joi.object({
    xTwilioWebhookEnabled: Joi.string().valid('true', 'false'),
    author: Joi.string(),
    body: Joi.string().required().strict(),
    dateCreated: Date,
    dateUpdated: Date,
    attributes: Joi.string(),
    mediaSid: Joi.string(),
    contentSid: Joi.string(),
    contentVariables: Joi.string()
  }).required()
})

export const schemaMessageContentConversation = Joi.object({
  conversation: schemaConversation.required(),
  options: Joi.object({
    author: Joi.string(),
    xTwilioWebhookEnabled: Joi.string().valid('true', 'false'),
    body: Joi.string(),
    dateCreated: Date,
    dateUpdated: Date,
    attributes: Joi.string(),
    mediaSid: Joi.string(),
    content: Joi.object({
      sid: schemaContentSid.required(),
      variables: Joi.object().pattern(Joi.number(), Joi.string().strict())
    }).required()
  }).required()
})

export const schemaAddresses = Joi.object({
  address: schemaAddress.required(),
  proxyAddress: schemaAddress.required()
}).required()

export const schemaExecutionStudioFlow = Joi.object({
  studioFlow: schemaStudioFlow.required(),
  options: Joi.object({
    to: schemaAddress.required(),
    from: schemaAddress.required(),
    parameter: Joi.object()
  }).required()
}).required()

export const schemaCreateSyncMapItem = Joi.object({
  syncMap: schemaSyncMap.required(),
  options: Joi.object({
    key: Joi.string().max(320).required(),
    data: Joi.object().required(),
    itemTtl: Joi.number()
  }).required()
}).required()

export const schemaSyncMapItem = Joi.object({
  syncMap: schemaSyncMap.required(),
  key: Joi.string().max(320).required()
}).required()

export const schemaOptionsCreateTaskQueue = Joi.object({
  friendlyName: Joi.string().required(),
  targetWorkers: Joi.string(),
  maxReservedWorkers: Joi.number().integer().min(1).max(50),
  taskOrder: Joi.string().valid('FIFO', 'LIFO'),
  reservationActivitySid: Joi.string(),
  assignmentActivitySid: Joi.string()
}).required()

export const schemaOptionsUpdateConversation = Joi.object({
  xTwilioWebhookEnabled: Joi.string().valid('true', 'false'),
  friendlyName: Joi.string(),
  dateCreated: Joi.date(),
  dateUpdated: Joi.date(),
  attributes: Joi.string(),
  messagingServiceSid: Joi.string(),
  state: Joi.string().valid('inactive', 'active', 'closed'),
  'timers.inactive': Joi.string(),
  'timers.closed': Joi.string(),
  uniqueName: Joi.string()
})

export const schemaParticipantConversationListOptions = Joi.object({
  identity: Joi.string(),
  address: Joi.string(),
  pageSize: Joi.number().integer().min(1).max(1000),
  limit: Joi.number().integer().min(1).max(1000)
})
