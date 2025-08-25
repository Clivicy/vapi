import Joi from 'joi';

export const createVoiceSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  type: Joi.string().required(),
  metadata: Joi.object().optional(),
});

export const updateVoiceSchema = Joi.object({
  name: Joi.string().optional(),
  url: Joi.string().uri().optional(),
  type: Joi.string().optional(),
  metadata: Joi.object().optional(),
});
