require('express-async-errors')
const morgan = require('morgan');
const express = require('express');
const database = require('../config/database');
const logger = require('../config/logger');

let server = null;

async function start(api, repository)
{
    const app = express();
    app.use(morgan('dev'));
    app.use(express.json());

    //Boa prática ter uma rota GET para um check quanto ao funcionamento do servidor
    app.get('/health', (req, res) => res.send(`The service ${process.env.MS_NAME} is runing at ! ${process.env.PORT}`))

    api(app, repository); //movies(app, repository)

    //page of error
    app.use((error, req, res, next) =>
    {
        // console.error(error);
        logger.error(error.stack)
        res.sendStatus(500);
    });

    await database.connect();
    server = app.listen(process.env.PORT, () => { console.log(`The service ${process.env.MS_NAME} started at port: ${process.env.PORT}`)} )
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

