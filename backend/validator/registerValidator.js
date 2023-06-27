const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net","in"] },
  }),
  password: Joi.string()
    .min(6)
    .max(10)
});

module.exports = {
  authSchema,
};
