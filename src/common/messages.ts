export const ERROR_MESSAGES = {
  GET_TWILIO_CLIENT_CONTEXT: {
    MESSAGE: '❌ ~ The context.getTwilioClient() object was not found.',
    DETAILS: `This happens because it did not pass "context" in the parameters or is not within the Twilio environment. You should provide the "accountSid" and "authToken" as follows:
{ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }`
  },
  TWILIO_CLIENT_NOT_FOUND: {
    MESSAGE: '❌ ~ Twilio client not found',
    DETAILS: `The Twilio client is not initialized. Please provide the accountSid and authToken to initialize the client as follows:
TwilioClient.initialize({ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", options: { ... } })
or
TwilioClient.initialize({ context, options: { ... } })`
  },
  CONTENTS_NOT_FOUND: {
    MESSAGE: '❌ ~ Contents not found.',
    STATUS: 404,
    CODE: 'CONTENTS_NOT_FOUND',
    MORE_INFO: 'https://www.twilio.com/docs/content-editor/overview',
    DETAILS: 'You not have content created in your twilio console, you can validate it in: https://console.twilio.com/us1/develop/sms/content-editor'
  },
  CONVERSATION_NOT_FOUND: {
    MESSAGE: '❌ ~ Conversation not found.',
    STATUS: 404,
    CODE: 'CONVERSATION_NOT_FOUND',
    MORE_INFO: 'https://www.twilio.com/docs/conversations/api/conversation-resource',
    DETAILS: `Has not requested any conversation, You should fetch or create the conversation as follows:
const conversation = await conversationManager.fetchConversation('CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
OR
const conversation = await conversationManager.createConversation()`
  }
}
