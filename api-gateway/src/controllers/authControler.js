const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');

const dologin = async (req, res, next) => {
    const { email, password } = req.body
    try{
        const user = await repository.getUser(email, password);
        const token = jwt.sign({userId: user._id, profileId: user.profileId}, process.env.SECRET, {expiresIn: parseInt(process.env.EXPIRES)})
        return res.json({token});
    }
    catch(error){
        console.error(error)
        return res.sendStatus(400);
    }
}

function validateLogin(req, res, next)
{
    const { schema } = require('../schema/schemaLogin');
    const { error } = schema.validate(req.body);
    if(error) return res.status(422).json(error.details[0].message);
    next();
}

async function ValidateBlackList(req, res, next)
{
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    if(!token) return res.sendStatus(400);
    const isBlackListed = await repository.checkBlackList(token);
    if(isBlackListed) return res.sendStatus(401);
    else
        next();
}

const validationToken = (req, res, next) => {
    let token = req.headers['authorization'];
    // if(!token) return res.sendStatus(401);
    token = token.replace('Bearer ', '');

    try{
        const { userId } = jwt.verify(token, process.env.SECRET);
        res.locals.userId = userId;
        next();
    }
    catch(error){
        return res.sendStatus(400);
    }
}

const dologout = async (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    await repository.insertBlackListToken(token);
    return res.sendStatus(200);
}

module.exports = { dologin, dologout, validationToken, ValidateBlackList, validateLogin }