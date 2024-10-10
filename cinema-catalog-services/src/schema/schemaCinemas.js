const joi = require('joi');

const schema = joi.object({
    cidade: joi.string().min(3).max(50).required(),
    uf: joi.string().length(2).pattern(/^[A-Za-z]{2}$/).required(),
    pais: joi.string().length(2).pattern(/^[A-Za-z]{2}$/).required(),
    cinemas: joi.array().items(joi.object({
        id: joi.string(),
        nome: joi.string().min(2).max(50).required(),
        salas: joi.array().items(joi.object({
            nome: joi.string().min(2).max(20).required(),
            sessoes: joi.array().items(joi.object({
                data: joi.date().required(),
                idFilme: joi.string(),
                filme: joi.string().min(2).max(50).required(),
                valor: joi.number().required(),
                assentos: joi.array().items(joi.object({
                    numero: joi.number().integer().required(),
                    disponivel: joi.boolean().required()
                }))
            }))
        }))
    }))
});

module.exports = { schema }