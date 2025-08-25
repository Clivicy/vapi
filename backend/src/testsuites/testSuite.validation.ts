import Joi from 'joi';

export const createTestSuiteSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  tests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      input: Joi.any().required(),
      expected: Joi.any().required(),
    })
  ).required(),
});

export const updateTestSuiteSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  tests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      input: Joi.any().required(),
      expected: Joi.any().required(),
    })
  ).optional(),
});
