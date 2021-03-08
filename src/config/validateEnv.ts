import Joi from "joi";

const validateEnv = function (env: {
    [k: string]: unknown;
}): Joi.ValidationResult {
    const schema = Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_TEMP_TOKEN: Joi.string().required(),
        JWT_TEMP_TOKEN_EXP: Joi.string().required(),
        COOKIE_SECRET: Joi.string().required(),
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        MAIL_TRAP_USER: Joi.string().required(),
        MAIL_TRAP_PASS: Joi.string().required(),
    }).unknown();
    const validate = schema.validate(env);
    return validate;
};

export default validateEnv;
