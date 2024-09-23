require('express-async-errors')
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const database = require('../config/database');
const log = require('../config/logger');

let server = null;

async function start(api, repository)
{
    const app = express();
    app.use(logger('dev'));
    //proteção contra roubo e acesso ao dados pelo cabeçalho
    app.use(helmet());

    //Boa prática ter uma rota GET para um check quanto ao funcionamento do servidor
    app.get('/health', (req, res) => res.send(`The service ${process.env.MS_NAME} is runing at ! ${process.env.PORT}`))

    api(app, repository);
//movies(app, repository)

    //page of error
    app.use((error, req, res, next) =>
    {
        // console.error(error);
        log.error(error.stack)
        res.sendStatus(500);
    });

    await database.connect();
    server = app.listen(process.env.PORT, () => { console.log(`The service ${process.env.MS_NAME} was started at ${process.env.PORT}`)} )
    return server
}

async function stop()
{
    if(server) 
    database.disconnect();
    await server.close();
    return true;
}

module.exports = { start, stop }

