"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.participants = exports.message = exports.fetchConversation = exports.createConversation = void 0;
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
const twilio_1 = require("../twilio");
/**
 * Creates a new conversation.
 *
 * @example
 * const conversation = await createConversation()
 */
async function createConversation() {
    (0, utils_1.validateClientTwilio)();
    return await twilio_1.client?.conversations.v1.conversations.create().catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createConversation ~ ${message}`, { ...error });
    });
}
exports.createConversation = createConversation;
/**
 * This function fetches a conversation using its unique identifier and returns a promise that resolves
 * with the conversation object.
 *
 * @example
 * const conversation = await fetchConversation('CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
async function fetchConversation(conversationSid) {
    (0, utils_1.validateClientTwilio)();
    (0, utils_1.validateVariables)(schemas_1.schemaConversationSid.required(), conversationSid, 'fetchConversation');
    return await twilio_1.client?.conversations.v1
        .conversations(conversationSid)
        .fetch()
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ fetchConversation ~ ${message}`, { ...error });
    });
}
exports.fetchConversation = fetchConversation;
exports.message = __importStar(require("./message"));
exports.participants = __importStar(require("./participant"));
exports.webhook = __importStar(require("./webhook"));
