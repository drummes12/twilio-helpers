export const ERROR_MESSAGES = {
  GET_TWILIO_CLIENT: {
    MESSAGE: '❌ ~ The context.getTwilioClient() object was not found.',
    DETAILS: `This happens because it did not pass "context" in the parameters or is not within the Twilio environment. You should provide the "accountSid" and "authToken" as follows:
{ accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", authToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }`
  }
}
