import Joi from 'joi';

export const createMetricSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
  type: Joi.string().required(),
  metadata: Joi.object().optional(),
});

export const updateMetricSchema = Joi.object({
  name: Joi.string().optional(),
  value: Joi.number().optional(),
  type: Joi.string().optional(),
  metadata: Joi.object().optional(),
});
