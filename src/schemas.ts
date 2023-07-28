import Joi from 'joi'

export const schemaResponse = Joi.object({
  statusCode: Joi.number().required(),
  body: Joi.object(),
}).required()
