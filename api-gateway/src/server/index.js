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
    //mantém a rota original das url após passar pelo gateway
    proxyReqPathResolver: (req) => { return req.originalUrl }
}

const httpProxy_movies =  httpProxy(process.env.MOVIES_API, options);
const httpProxy_catalogCinemaS =  httpProxy(process.env.CATALOG_CINEMAS_API, options);

app.post('/login', authControler.validateLogin, authControler.dologin);

//medleware para verificar se o token é ainda é valido. Antes de qualquer acesso de rota, irá passar pela verificação.
app.use('*', authControler.ValidateBlackList);

app.post('/logout', authControler.validationToken, authControler.dologout);

app.use('/movies', httpProxy_movies);

app.get(/city|cities|cinema|cinemas|movi|movies/, httpProxy_catalogCinemaS);
app.put(/city|cities|cinema|cinemas/, httpProxy_catalogCinemaS);
app.patch(/addCinema/, httpProxy_catalogCinemaS);
app.delete(/city|cities|cinema|cinemas/, httpProxy_catalogCinemaS);

const server = app.listen(process.env.PORT, console.log(`Server started at PORT ${process.env.PORT}`));

module.exports = { server }