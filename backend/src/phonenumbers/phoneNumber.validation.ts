import Joi from 'joi';

export const createPhoneNumberSchema = Joi.object({
  number: Joi.string().required(),
  assignedTo: Joi.string().optional(),
  status: Joi.string().required(),
  metadata: Joi.object().optional(),
});

export const updatePhoneNumberSchema = Joi.object({
  number: Joi.string().optional(),
  assignedTo: Joi.string().optional(),
  status: Joi.string().optional(),
  metadata: Joi.object().optional(),
});
