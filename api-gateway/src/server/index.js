const express = require('express');
const httpProxy = require('express-http-proxy');
const morgan = require('morgan');
const helmet = require('helmet');
const authControler = require('../controllers/authControler');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

const options = {
    //Mantém a rota original das URLs após passar pelo gateway
    proxyReqPathResolver: (req) => { return req.originalUrl }
}

//Instanciação de proxy que redireciona as requisições para a URL definida nas variáveis de ambiente
const httpProxy_movies =  httpProxy(process.env.MOVIES_API, options);
const httpProxy_catalogCinemaS =  httpProxy(process.env.CATALOG_CINEMAS_API, options);

app.post('/login', authControler.validateLogin, authControler.dologin);

//Chamada do meddleware para verificar se o token ainda é valido.
app.use('*', authControler.ValidateBlackList);

app.post('/logout', authControler.validationToken, authControler.dologout);

const filters = /city|cities|cinema|cinemas/;

//Redirecionamento das requisições que correspondem à essas rotas. Redireciona para os caminhos, ou da variável httpProxy_movies, ou da  httpProxy_catalogCinemaS
app.use('/movies', httpProxy_movies);
app.get(/city|cities|cinema|cinemas|movies|movies/, httpProxy_catalogCinemaS);
app.put(filters, httpProxy_catalogCinemaS);
app.patch(filters, httpProxy_catalogCinemaS);
app.delete(filters, httpProxy_catalogCinemaS);

const server = app.listen(process.env.PORT, () => { console.log(`The service ${process.env.MS_NAME} was started at ${process.env.PORT}`)} );
module.exports = { server }
