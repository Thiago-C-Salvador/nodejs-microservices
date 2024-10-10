const { validationMovie, validationToken, authorizationUser, validationUpload } = require('../middleware/middlewareValidation');
const logger = require('../config/logger');
module.exports = (app, repository) =>
{
    //rotornar todos os filmes lançamento
    app.get('/movies/premieres', validationToken, async (req, res, next) => 
    {
        const movies = await repository.getMoviePrimieres();
        res.json(movies);
    })

    //retornar um filme por ID
    app.get('/movies/:id', validationToken, async (req, res, next) =>
    {
        const movie = await repository.getMovieById(req.params.id);
        if(!movie) return res.sendStatus(404);
        res.json(movie);
    })

    //retornar todos os filmes
    app.get('/movies', validationToken, async (req, res, next) =>
    {
        const movies = await repository.getAllMovies();
        res.json(movies);
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

    app.patch("/movies/:id", validationUpload, validationToken, authorizationUser, async (req, res, next ) => 
    {
        const idMovie = req.params.id
        const response = await repository.updateMovie(idMovie, req.body);
        if(response === -1) return res.status(404).json({message: `The id ${idMovie} movie does not exist.`});
        return res.status(200).json({ message: `Filme de id ${idMovie} foi atualizado com sucesso.`});
    });

    app.delete('/movies/:id', validationToken, authorizationUser, async (req, res, next) =>
    {
        const idMovie = req.params.id
        const result = await repository.deleteMovie(idMovie);
        if(result === -1) return res.status(404).json({message: `The id ${idMovie} movie does not exist.`});
        console.log(result)
        logger.info(`Movie of ID ${idMovie} deletede by userID ${res.locals.userId} at ${new Date()}`);
        return res.sendStatus(204);
     
    });
} 