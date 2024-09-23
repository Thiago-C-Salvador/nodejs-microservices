const middlewareMovie = require('../middleware/middlewareMovies');

module.exports = (app, repository) =>
{
    //rotornar todos os filmes lançamento
    app.get('/movies/premieres', async (req, res, next) => 
    {
        const movies = await repository.getMoviePrimieres()
        // if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    })

    //retornar um filme por ID
    app.get('/movies/:id', async (req, res, next) =>
    {
        const movie = await repository.getMovieById(req.params.id)
        if(!movie) return res.sendStatus(404);
        res.json(movie)
    })

    //retornar todos os filmes
    app.get('/movies', async (req, res, next) =>
    {
        const movies = await repository.getAllMovies();
        // if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    });
    
    //adicionar filme
    app.post("/movies", middlewareMovie.middlewareValidationMovie, async (req, res, next) =>
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
        res.status(201).json(response);
    });

    app.delete('/delete_movie/:id', async (req, res, next) =>
    {
        await repository.deleteMovie(req.params.id);
        // if(response === -1) return res.sendStatus(404)
        // return res.sendStatus(204);
        res.sendStatus(204);
    })

} 