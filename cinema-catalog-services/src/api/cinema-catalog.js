module.exports = (app, repository) =>
{
    app.get('/movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter', async (req, res, next) => 
    {
        const cinema_thearter = await repository.getMoviesByTheater(req.params.id_city, req.params.id_cinema, req.params.movie_thearter)
        if(!cinema_thearter || !cinema_thearter.length) return res.sendStatus(404);
        res.json(cinema_thearter)
    })

    app.get('/sessions_of_movie/city/:id_city/movie/:id_movie', async (req, res, next) => 
    {
        const movies = await repository.getSessionMovieById(req.params.id_city, req.params.id_movie)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    });

    app.get('/movies_in_city/:id', async (req, res, next) => 
    {
        const movies = await repository.getMoviesInCityById(req.params.id)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    });
    
    app.get('/movies_by_cinema/:id', async (req, res, next) => 
    {
        const movies = await repository.getMoviesCinemaById(req.params.id)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies)
    });

    app.get('/cinemas_in_city/:id', async (req, res, next) =>
    {
        const cinemas = await repository.getCinemasByCityId(req.params.id)
        if(!cinemas || !cinemas.length) return res.sendStatus(404);
        // let allCinemas = [];
        // cinemas.forEach((element) => {
        //     if(element.nome) allCinemas.push(element.nome) 
        // });
        res.json(cinemas)
    });

    app.get('/allCities', async (req, res, next) =>
    {
        const cities = await repository.getAllCities();
        res.json(cities)
    });
} 