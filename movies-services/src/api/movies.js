const { validationMovie, validationToken, authorizationUser } = require('../middleware/middlewareValidation');
const logger = require('../config/logger');
module.exports = (app, repository) =>
{
    //rotornar todos os filmes lançamento
    app.get('/movies/premieres', validationToken, async (req, res, next) => 
    {
        const movies = await repository.getMoviePrimieres()
        // if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    })

    //retornar um filme por ID
    app.get('/movies/:id', validationToken, async (req, res, next) =>
    {
        const movie = await repository.getMovieById(req.params.id)
        if(!movie) return res.sendStatus(404);
        res.json(movie)
    })

    //retornar todos os filmes
    app.get('/movies', validationToken, async (req, res, next) =>
    {
        const movies = await repository.getAllMovies();
        // if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    });
    
    //adicionar filme
    app.post('/movies', validationToken, authorizationUser, validationMovie,  async (req, res, next) =>
    {
        const movie = {
            titulo: req.body.titulo,
            sinopse: req.body.sinopse,
            duracao: parseInt(req.body.duracao),
            dataLancamento: new Date(req.body.dataLancamento),
            imagem: req.body.imagem,
            categorias: req.body.categorias
        }
        const response = await repository.addMovie(movie);

        logger.info(`Movie ${req.body.titulo} added by userID ${res.locals.userId} at ${new Date()}`);
        res.status(201).json(response);
    });

    app.delete('/movies/:id', validationToken, authorizationUser, async (req, res, next) =>
    {
        await repository.deleteMovie(req.params.id);
        logger.info(`Movie of ID ${req.params.id} deletede by userID ${res.locals.userId} at ${new Date()}`);
        // if(response === -1) return res.sendStatus(404)
        return res.sendStatus(204);
     
    })
} 