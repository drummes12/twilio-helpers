import Joi from 'joi';
export declare const schemaSid: (initialSid: string) => Joi.StringSchema<string>;
/** SCHEMAS SID */
export declare const schemaAccoundSid: Joi.StringSchema<string>;
export declare const schemaAuthToken: Joi.StringSchema<string>;
export declare const schemaConversationSid: Joi.StringSchema<string>;
export declare const schemaContentSid: Joi.StringSchema<string>;
export declare const schemaStudioFlowSid: Joi.StringSchema<string>;
export declare const schemaSyncServiceSid: Joi.StringSchema<string>;
export declare const schemaWorkspaceSid: Joi.StringSchema<string>;
export declare const schemaTaskSid: Joi.StringSchema<string>;
export declare const schemaSyncMapSid: Joi.StringSchema<string>;
/** SCHEMAS BASE */
export declare const schemaString: Joi.StringSchema<string>;
/** SCHEMAS BASE TWILIO */
export declare const schemaAddress: Joi.StringSchema<string>;
export declare const schemaResponse: Joi.ObjectSchema<any>;
export declare const schemaAuth: Joi.ObjectSchema<any>;
export declare const schemaConversation: Joi.ObjectSchema<any>;
export declare const schemaStudioFlow: Joi.ObjectSchema<any>;
export declare const schemaSyncService: Joi.ObjectSchema<any>;
export declare const schemaWorkspace: Joi.ObjectSchema<any>;
export declare const schemaSyncMap: Joi.ObjectSchema<any>;
/** SCHEMAS FUNCTIONS */
export declare const schemaWebhookConversation: Joi.ObjectSchema<any>;
export declare const schemaFindWebhookTargetConversation: Joi.ObjectSchema<any>;
export declare const schemaMessageConversation: Joi.ObjectSchema<any>;
export declare const schemaMessageContentConversation: Joi.ObjectSchema<any>;
export declare const schemaAddresses: Joi.ObjectSchema<any>;
export declare const schemaExecutionStudioFlow: Joi.ObjectSchema<any>;
export declare const schemaCreateSyncMapItem: Joi.ObjectSchema<any>;
export declare const schemaSyncMapItem: Joi.ObjectSchema<any>;
export declare const schemaOptionsCreateTaskQueue: Joi.ObjectSchema<any>;
