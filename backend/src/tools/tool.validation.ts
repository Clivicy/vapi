import Joi from 'joi';

export const createToolSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  config: Joi.object().optional(),
});

export const updateToolSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  config: Joi.object().optional(),
});
