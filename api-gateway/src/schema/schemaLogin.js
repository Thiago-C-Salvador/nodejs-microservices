const joi = require('joi');

const schema = joi.object({
    email: joi.string().email().min(8).max(100).required(),
    password: joi.string().min(6).max(100).required(),
});

module.exports = { schema }