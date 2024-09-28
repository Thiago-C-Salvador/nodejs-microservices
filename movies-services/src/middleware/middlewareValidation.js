const {schema} = require('../schema/schemaMovies');
const jwt = require('jsonwebtoken');

const ADMIN_PROFILE = 1;

const validationMovie = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if(error) return res.status(422).json(error);
    next();
}

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

const authorizationUser = (req, res, next) => {
    const { profileId } =  res.locals;
    if(!(profileId == ADMIN_PROFILE)) return res.sendStatus(403);
    next();
}

module.exports = { validationMovie, validationToken, authorizationUser }