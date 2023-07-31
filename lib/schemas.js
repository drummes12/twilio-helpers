"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaOptionsCreateTaskQueue = exports.schemaSyncMapItem = exports.schemaCreateSyncMapItem = exports.schemaExecutionStudioFlow = exports.schemaAddresses = exports.schemaMessageContentConversation = exports.schemaMessageConversation = exports.schemaFindWebhookTargetConversation = exports.schemaWebhookConversation = exports.schemaSyncMap = exports.schemaWorkspace = exports.schemaSyncService = exports.schemaStudioFlow = exports.schemaConversation = exports.schemaAuth = exports.schemaResponse = exports.schemaAddress = exports.schemaString = exports.schemaSyncMapSid = exports.schemaTaskSid = exports.schemaWorkspaceSid = exports.schemaSyncServiceSid = exports.schemaStudioFlowSid = exports.schemaContentSid = exports.schemaConversationSid = exports.schemaAuthToken = exports.schemaAccoundSid = exports.schemaSid = void 0;
const joi_1 = __importDefault(require("joi"));
const consts_js_1 = require("./consts.js");
const schemaSid = (initialSid) => joi_1.default.string().pattern((0, consts_js_1.REGEX_SID)(initialSid));
exports.schemaSid = schemaSid;
/** SCHEMAS SID */
exports.schemaAccoundSid = (0, exports.schemaSid)(consts_js_1.SID.account.initial).label(consts_js_1.SID.account.label);
exports.schemaAuthToken = (0, exports.schemaSid)(consts_js_1.SID.authToken.initial).label(consts_js_1.SID.authToken.label);
exports.schemaConversationSid = (0, exports.schemaSid)(consts_js_1.SID.conversation.initial).label(consts_js_1.SID.conversation.label);
exports.schemaContentSid = (0, exports.schemaSid)(consts_js_1.SID.content.initial).label(consts_js_1.SID.content.label);
exports.schemaStudioFlowSid = (0, exports.schemaSid)(consts_js_1.SID.studioFlow.initial).label(consts_js_1.SID.studioFlow.label);
exports.schemaSyncServiceSid = (0, exports.schemaSid)(consts_js_1.SID.syncService.initial).label(consts_js_1.SID.syncService.label);
exports.schemaWorkspaceSid = (0, exports.schemaSid)(consts_js_1.SID.workspace.initial).label(consts_js_1.SID.workspace.label);
exports.schemaTaskSid = (0, exports.schemaSid)(consts_js_1.SID.task.initial).label(consts_js_1.SID.task.label);
exports.schemaSyncMapSid = (0, exports.schemaSid)(consts_js_1.SID.syncMap.initial).label(consts_js_1.SID.syncMap.label);
/** SCHEMAS BASE */
exports.schemaString = joi_1.default.string();
/** SCHEMAS BASE TWILIO */
exports.schemaAddress = joi_1.default.string().pattern(consts_js_1.REGEX_ADDRESS).strict();
exports.schemaResponse = joi_1.default.object({
    statusCode: joi_1.default.number().required(),
    body: joi_1.default.object()
}).required();
exports.schemaAuth = joi_1.default.object({
    accountSid: exports.schemaAccoundSid.required(),
    authToken: exports.schemaAuthToken.required()
}).required();
exports.schemaConversation = joi_1.default.object({
    sid: exports.schemaConversationSid.required()
})
    .min(2)
    .unknown(true)
    .required();
exports.schemaStudioFlow = joi_1.default.object({
    sid: exports.schemaStudioFlowSid.required()
})
    .min(2)
    .unknown(true)
    .required();
exports.schemaSyncService = joi_1.default.object({
    _solution: joi_1.default.object({
        sid: exports.schemaSyncServiceSid.required()
    }).required()
})
    .min(2)
    .unknown(true)
    .required();
exports.schemaWorkspace = joi_1.default.object({
    _solution: joi_1.default.object({
        sid: exports.schemaWorkspaceSid.required()
    }).required()
})
    .min(2)
    .unknown(true)
    .required();
exports.schemaSyncMap = joi_1.default.object({
    sid: exports.schemaSyncMapSid.required(),
    uniqueName: joi_1.default.string().required()
})
    .min(2)
    .unknown(true)
    .required();
/** SCHEMAS FUNCTIONS */
exports.schemaWebhookConversation = joi_1.default.object({
    conversation: exports.schemaConversation.required(),
    options: joi_1.default.object({
        method: joi_1.default.string().valid(...consts_js_1.WEBHOOK_METHOD),
        filters: joi_1.default.array()
            .items(joi_1.default.string().valid(...consts_js_1.WEBHOOK_POST_ACTION))
            .min(1),
        triggers: joi_1.default.array().items(joi_1.default.string()).min(1),
        url: joi_1.default.string().uri(),
        target: joi_1.default.string()
            .valid(...consts_js_1.WEBHOOK_TARGET)
            .required(),
        flowSid: exports.schemaStudioFlowSid
    }).required()
}).required();
exports.schemaFindWebhookTargetConversation = joi_1.default.object({
    conversation: exports.schemaConversation.required(),
    target: joi_1.default.string()
        .valid(...consts_js_1.WEBHOOK_TARGET)
        .required()
}).required();
exports.schemaMessageConversation = joi_1.default.object({
    conversation: exports.schemaConversation.required(),
    options: joi_1.default.object({
        author: joi_1.default.string().required().strict(),
        body: joi_1.default.string().required().strict()
    }).required()
}).required();
exports.schemaMessageContentConversation = joi_1.default.object({
    conversation: exports.schemaConversation.required(),
    options: joi_1.default.object({
        author: joi_1.default.string().required().strict(),
        content: joi_1.default.object({
            sid: exports.schemaContentSid.required(),
            variables: joi_1.default.object().pattern(joi_1.default.number(), joi_1.default.string().strict()).min(1)
        }).required()
    }).required()
}).required();
exports.schemaAddresses = joi_1.default.object({
    address: exports.schemaAddress.required(),
    proxyAddress: exports.schemaAddress.required()
}).required();
exports.schemaExecutionStudioFlow = joi_1.default.object({
    studioFlow: exports.schemaStudioFlow.required(),
    options: joi_1.default.object({
        to: exports.schemaAddress.required(),
        from: exports.schemaAddress.required(),
        parameter: joi_1.default.object()
    }).required()
}).required();
exports.schemaCreateSyncMapItem = joi_1.default.object({
    syncMap: exports.schemaSyncMap.required(),
    options: joi_1.default.object({
        key: joi_1.default.string().max(320).required(),
        data: joi_1.default.object().required(),
        itemTtl: joi_1.default.number()
    }).required()
}).required();
exports.schemaSyncMapItem = joi_1.default.object({
    syncMap: exports.schemaSyncMap.required(),
    key: joi_1.default.string().max(320).required()
}).required();
exports.schemaOptionsCreateTaskQueue = joi_1.default.object({
    friendlyName: joi_1.default.string().required(),
    targetWorkers: joi_1.default.string(),
    maxReservedWorkers: joi_1.default.number().integer().min(1).max(50),
    taskOrder: joi_1.default.string().valid('FIFO', 'LIFO'),
    reservationActivitySid: joi_1.default.string(),
    assignmentActivitySid: joi_1.default.string()
}).required();
