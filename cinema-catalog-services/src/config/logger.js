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
            filename: path.join( __dirname, "..", "logs", "logs.txt"),
            level: 'error'
        })
    ]
});

if(process.env.NODE.ENV !== 'production')
{
    log.add(new winston.transports.Console({ format: winston.format.simple()}))
}

module.exports = log;