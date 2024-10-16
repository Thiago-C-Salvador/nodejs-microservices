const winston = require('winston');
const path = require('path');

const log = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.File({
            filename: path.join( __dirname, "..", "./logs", "error.log"),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "..", "./logs", "info.log"),
            level: 'info'
        })
    ]
});

//Em caso da aplicação rodar em nível de produção, então não irá apenas salvar os logs em arquivo, não lançará em console também.
if(process.env.NODE.ENV !== 'production')
{
    log.add(new winston.transports.Console({ format: winston.format.simple()}))
}

module.exports = { log };