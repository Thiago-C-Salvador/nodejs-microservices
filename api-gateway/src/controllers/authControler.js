const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');

//Espera receber o e-mail (username) e o password. Caso esteja tudo Ok no login, então ocorre a assinatura de um token para tal usuário.
const dologin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await repository.getUser(email, password);
        const token = jwt.sign({userId: user._id, profileId: user.profileId}, process.env.SECRET, {expiresIn: parseInt(process.env.EXPIRES)});
        return res.json({token});
    }
    catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}

//Validação de campos e dados recebido para a função de login.
function validateLogin(req, res, next)
{
    const { schema } = require('../schema/schemaLogin');
    const { error } = schema.validate(req.body);
    if(error) return res.status(422).json(error.details[0].message);
    next();
}

//Verifica se o token do usuário já expirou, ou se por algum outro motivo, como fazer logout, o token tenha perdido a validade.
async function ValidateBlackList(req, res, next)
{
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    if(!token) return res.sendStatus(400);
    const isBlackListed = await repository.checkBlackList(token);
    if(isBlackListed) return res.sendStatus(401);
    else next();
}

//Meddleware para verificar a se há ou não o token junto ao cabeçalho e se o mesmo é um token integro/válido.
const validationToken = (req, res, next) => {
    let token = req.headers['authorization'];
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

//Realiza a inserção do token na blackList ao concluir o logout.
const dologout = async (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    await repository.insertBlackListToken(token);
    return res.sendStatus(200);
}

module.exports = { dologin, dologout, validationToken, ValidateBlackList, validateLogin }