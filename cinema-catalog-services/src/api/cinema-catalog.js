const { ObjectId } = require('mongodb');
const { validationToken, validateCityCinema, authorizationUser } = require('../middleware/middlewareValidation');

module.exports = (app, repository) =>
{
    app.get('/movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter', validationToken, async (req, res, next) => 
    {
        const cinema_thearter = await repository.getMoviesByTheater(req.params.id_city, req.params.id_cinema, req.params.movie_thearter)
        if(!cinema_thearter || !cinema_thearter.length) return res.sendStatus(404);
        res.json(cinema_thearter);
    })

    app.get('/sessions_of_movie/city/:id_city/movie/:id_movie', validationToken, async (req, res, next) => 
    {
        const movies = await repository.getSessionMovieById(req.params.id_city, req.params.id_movie)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies);
    });

    app.get('/movies_in_city/:id', validationToken, async (req, res, next) => 
    {
        const movies = await repository.getMoviesInCityById(req.params.id)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies);
    });
    
    app.get('/movies_by_cinema/:id', validationToken, async (req, res, next) => 
    {
        const movies = await repository.getMoviesCinemaById(req.params.id)
        if(!movies || !movies.length) return res.sendStatus(404);
        res.json(movies);
    });

    app.get('/cinemas_in_city/:id', validationToken, async (req, res, next) =>
    {
        const cinemas = await repository.getCinemasByCityId(req.params.id)
        if(!cinemas || !cinemas.length) return res.sendStatus(404);
        // let allCinemas = [];
        // cinemas.forEach((element) => {
        //     if(element.nome) allCinemas.push(element.nome) 
        // });
        res.json(cinemas);
    });

    app.get('/cities', validationToken, async (req, res, next) =>
    {
        const cities = await repository.getAllCities();
        res.json(cities);
    });

    app.put('/cityAndCinema', validateCityCinema, validationToken, authorizationUser, async (req, res, next) => {

        for( let i = 0; i <= req.body.cinemas.length-1; i++)
        {
            req.body.cinemas[i].id = new ObjectId();

            for( let j = 0; j <= req.body.cinemas[i].salas.length-1; j++)
            {
                for( let l = 0; l <= req.body.cinemas[i].salas[j].sessoes.length-1; l++)
                {
                    const data = req.body.cinemas[i].salas[j].sessoes[l].data
                    req.body.cinemas[i].salas[j].sessoes[l].data = new Date(data);
                    req.body.cinemas[i].salas[j].sessoes[l].idFilme = new ObjectId();
                }
            }
        }
        const response = await repository.addNewCity(req.body);
        return res.status(response.status).json(response)
    }); 

    app.patch('/addCinema/:id', validateCityCinema, validationToken, authorizationUser, async (req, res, next) => {
        for( let i = 0; i <= req.body.cinemas.length-1; i++)
        {
            if(!req.body.cinemas[i].id){
                req.body.cinemas[i].id = new ObjectId();

                for( let j = 0; j <= req.body.cinemas[i].salas.length-1; j++)
                {
                    for( let l = 0; l <= req.body.cinemas[i].salas[j].sessoes.length-1; l++)
                    {
                        const data = req.body.cinemas[i].salas[j].sessoes[l].data
                        req.body.cinemas[i].salas[j].sessoes[l].data = new Date(data);
                        req.body.cinemas[i].salas[j].sessoes[l].idFilme = new ObjectId();
                    }
                }
            }
        }
        const response = await repository.newCinema(req.params.id, req.body);
        return res.status(response.status).json(response)
    }); 

    app.delete('/city/:id', validationToken, authorizationUser, async (req, res, next) => {
        const response = await repository.deleteCity(req.params.id);
        res.status(response.status).json({ message: response.message });
    });

    app.delete('/cinemas/:idCity', validationToken, authorizationUser, async (req, res, next) => {
        const response = await repository.deleteAllCinemasByCityId(req.params.idCity);
        res.status(response.status).json({ message: response.message });
    });
}