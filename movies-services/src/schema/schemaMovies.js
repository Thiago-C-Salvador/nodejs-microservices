const Joi = require('joi');

const schema = Joi.object({
    titulo: Joi.string().min(2).max(150).required(),
    sinopse: Joi.string().min(15).max(1000),
    duracao: Joi.number().integer(),
    dataLancamento: Joi.date().required(),
    imagem: Joi.string().pattern(/https?:\/\/.+\.(jpe?g|png|svg|gif)/i).required(),
    categorias: Joi.array().items(Joi.string()).required(),
});

const schemaUpdate = Joi.object({
    titulo: Joi.string().min(2).max(150),
    sinopse: Joi.string().min(15).max(1000),
    duracao: Joi.number().integer(),
    dataLancamento: Joi.date(),
    imagem: Joi.string().pattern(/https?:\/\/.+\.(jpe?g|png|svg|gif)/i),
    categorias: Joi.array().items(Joi.string()),
});

module.exports = { schema, schemaUpdate }

