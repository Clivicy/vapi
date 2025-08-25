import Joi from 'joi';

export const createAPIKeySchema = Joi.object({
  key: Joi.string().required(),
  user: Joi.string().required(),
  revoked: Joi.boolean().optional(),
  revokedAt: Joi.date().optional(),
});

export const updateAPIKeySchema = Joi.object({
  key: Joi.string().optional(),
  user: Joi.string().optional(),
  revoked: Joi.boolean().optional(),
  revokedAt: Joi.date().optional(),
});
