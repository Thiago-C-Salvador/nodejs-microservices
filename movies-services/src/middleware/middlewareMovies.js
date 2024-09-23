const {schema} = require('../schema/schemaMovies');

const middlewareValidationMovie = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if(error)
    {
        return res.status(422).json(error)
    }
    next();
}

module.exports = { middlewareValidationMovie }