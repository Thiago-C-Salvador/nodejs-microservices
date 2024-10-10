const jwt = require('jsonwebtoken');
const { schema } = require('../schema/schemaCinemas');

const ADMIN_PROFILE = 1;

const validationToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(!token) return res.sendStatus(401);

    token = token.replace('Bearer ', '');

    try{
        const { userId, profileId } = jwt.verify(token, process.env.SECRET);
        res.locals.userId = userId;
        res.locals.profileId = profileId;
        next();
    }
    catch(error){
        return res.sendStatus(401);
    }
}

const validateCityCinema = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if(error)
    {
        const info = error.message.slice(1, error.message.indexOf('" '));
        if( info === "state" || info === "country") return res.status(422).json(`This property "${info}" most contain exactly 2 characters.`);
        return res.status(422).json(error.message);
    }
    next();
}

//ADMIN_PROFILE pode e dever ser configurado em uma variável de ambiente.
const authorizationUser = (req, res, next) => {
    const { profileId } =  res.locals;
    if(!(profileId == ADMIN_PROFILE)) return res.sendStatus(403);
    next();
}

module.exports = { validationToken, validateCityCinema, authorizationUser }