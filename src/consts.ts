export const SID = {
  account: { initial: 'AC', label: 'Account SID' },
  authToken: { initial: '', label: 'Auth Token' },
  conversation: { initial: 'CH', label: 'Conversation SID' },
  content: { initial: 'HX', label: 'Content SID' },
  studioFlow: { initial: 'FW', label: 'Studio Flow SID' },
  syncService: { initial: 'IS', label: 'Service Sync SID' },
  syncMap: { initial: 'MP', label: 'Map Sync SID' }
}

export const REGEX_SID = (initialSid: string) => new RegExp(`^${initialSid}[\\S]{32}$`)
export const REGEX_ADDRESS = /^(?=.*\d{10})\S+$/

export const WEBHOOK_METHOD = ['GET', 'POST']
export const WEBHOOK_TARGET = ['webhook', 'studio', 'trigger']
export const WEBHOOK_PRE_ACTION = [
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
]
export const WEBHOOK_POST_ACTION = [
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
]
