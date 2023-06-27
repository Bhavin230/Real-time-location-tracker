const Joi = require("joi");

const authschemalogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net","in"] },
  }),
  password: Joi.string()
    .min(6)
    .max(10)
});

module.exports = {
    authschemalogin,
};
