const express = require('express');
const httpProxy = require('express-http-proxy');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParse = require('cookie-parse');
const authControler = require('../controllers/authControler');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

const options ={
    proxyReqPathResolver: (req) => { return req.originalUrl }
}

const httpProxy_movies =  httpProxy(process.env.MOVIES_API, options);
const httpProxy_catalogCinemaS =  httpProxy(process.env.CATALOG_CINEMAS_API, options);

app.post('/login', authControler.validateLogin, authControler.dologin);

app.use('*', authControler.ValidateBlackList);

app.post('/logout', authControler.validationToken, authControler.dologout);

app.use('/movies', httpProxy_movies);
// app.use('/cities', httpProxy_catalogCinemaS);
// app.use('/cinemas', httpProxy_catalogCinemaS);
app.get(/city|cities|cinemas|movies/, httpProxy_catalogCinemaS);

const server = app.listen(process.env.PORT, console.log(`Server started at PORT ${process.env.PORT}`));

module.exports = { server }