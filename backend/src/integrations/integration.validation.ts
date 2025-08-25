import Joi from 'joi';

export const createIntegrationSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  config: Joi.object().optional(),
  status: Joi.string().required(),
});

export const updateIntegrationSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  config: Joi.object().optional(),
  status: Joi.string().optional(),
});
