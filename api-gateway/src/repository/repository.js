const database = require('../config/database');
const bcrypt = require('bcrypt');

async function getUser(email, password)
{
    const db = await database.connect();
    const user = await db.collection('users').findOne({ email: email });
    if(!user) throw new Error("Wrong user and/or password");
    const isValid = bcrypt.compareSync(password, user.password)
    if(isValid) return user;
    throw new Error("Wrong user and/or password");
}

async function insertBlackListToken(token)
{
    const db = await database.connect();
    return db.collection('blackList').insertOne({_id: token, data: new Date()});
}

async function checkBlackList(token)
{
    const db = await database.connect();
    const result = await db.collection('blackList').countDocuments({_id: token});
    return result > 0;
}


module.exports = { getUser, insertBlackListToken, checkBlackList }
