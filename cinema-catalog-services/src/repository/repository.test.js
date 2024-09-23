const repository = require('../repository/repository');
const database = require('../config/database');
let cityId = null;
let cinemaId = null;
let movieId = null;
let sala = null;

beforeAll( async () =>
{
    const cities = await repository.getAllCities();
    cityId = cities[cities.length - 1]._id;

    const cinemas = await repository.getCinemasByCityId(cityId);
    cinemaId = cinemas[0].id;
    // console.log(cinemas[0].idCinema)

    sala =  cinemas[0].salas[0].nome;

    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
})

test('Get all citys', async () =>// listar cidades cadastradas
{
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();
})

test('Get by city id', async () => //listar cinemas da cidade
{
    const cinemas = await repository.getCinemasByCityId(cityId);
    console.log(cinemas);
    expect(cinemas).toBeTruthy();
    expect(Array.isArray(cinemas)).toBeTruthy();
})


test('Get movies by cinema id', async () => //Todos os filmes de um certo cinema
{
    const movies = await repository.getMoviesCinemaById(cinemaId);
    // console.log(movies);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
})


test('Get movies by city id', async () =>// todos os filmes em uma certa cidade
{
    const movies = await repository.getMoviesInCityById(cityId);
    // console.log(movies);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
})


test('Get movies by session id', async () => //listar sessões de um certo filme
{
    const movies = await repository.getSessionMovieById(cityId, movieId);
    // console.log(movies);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
})


test('Get movies by theater', async () => //obter filmes de uma certa sala
{
    const movies = await repository.getMoviesByTheater(cityId, cinemaId, sala);
    // console.log(movies);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
})




