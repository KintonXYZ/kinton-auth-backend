import * as joi from "joi";

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(["development", "production", "test"])
    .default("development"),
  PORT: joi.number()
    .default(3000),
  LOG_LEVEL: joi.string()
    .allow(["error", "warn", "info", "verbose", "debug", "silly"])
    .default("info"),
  MONGO_HOST: joi.string()
    .default("mongodb"),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const conf = {
  env: envVars.NODE_ENV,
  logger: {
    level: envVars.LOG_LEVEL,
  },
  db: {
    mongo: envVars.MONGO_HOST,
  },
  server: {
    port: envVars.PORT,
  },
};

export = conf;
