import * as Joi from 'joi';
export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(9000),
  MONGO_URI: Joi.string().uri().required(),
});
