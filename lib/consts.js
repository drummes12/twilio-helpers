"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOK_POST_ACTION = exports.WEBHOOK_PRE_ACTION = exports.WEBHOOK_TARGET = exports.WEBHOOK_METHOD = exports.REGEX_ADDRESS = exports.REGEX_SID = exports.SID = void 0;
exports.SID = {
    account: { initial: 'AC', label: 'Account SID' },
    authToken: { initial: '', label: 'Auth Token' },
    conversation: { initial: 'CH', label: 'Conversation SID' },
    content: { initial: 'HX', label: 'Content SID' },
    studioFlow: { initial: 'FW', label: 'Studio Flow SID' },
    syncService: { initial: 'IS', label: 'Service Sync SID' },
    workspace: { initial: 'WS', label: 'Workspace SID' },
    task: { initial: 'WT', label: 'Task SID' },
    syncMap: { initial: 'MP', label: 'Map Sync SID' }
};
const REGEX_SID = (initialSid) => new RegExp(`^${initialSid}[\\S]{32}$`);
exports.REGEX_SID = REGEX_SID;
exports.REGEX_ADDRESS = /^(?=.*\d{10})\S+$/;
exports.WEBHOOK_METHOD = ['GET', 'POST'];
exports.WEBHOOK_TARGET = ['webhook', 'studio', 'trigger'];
exports.WEBHOOK_PRE_ACTION = [
    'onMessageAdd',
    'onMessageRemove',
    'onMessageUpdate',
    'onConversationAdd',
    'onConversationRemove',
    'onConversationUpdate',
    'onParticipantAdd',
    'onParticipantRemove',
    'onParticipantUpdate',
    'onUserUpdate'
];
exports.WEBHOOK_POST_ACTION = [
    'onMessageAdded',
    'onMessageRemoved',
    'onMessageUpdated',
    'onConversationAdded',
    'onConversationRemoved',
    'onConversationUpdated',
    'onParticipantAdded',
    'onParticipantRemoved',
    'onParticipantUpdated',
    'onConversationStateUpdated',
    'onDeliveryUpdated',
    'onUserAdded',
    'onUserUpdated'
];
