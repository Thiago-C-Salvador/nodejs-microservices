const { ObjectId } = require('mongodb');
const repository = require('../repository/repository');
const database = require('../config/database');
let cityId = null;
let cinemaId = null;
let movieId = null;
let sala = null;
let firstCity = null;

beforeAll( async () =>
{
    const cities = await repository.getAllCities();
    cityId = cities[cities.length - 1]._id;
    firstCity = cities[0]._id;

    const cinemas = await repository.getCinemasByCityId(cityId);
    cinemaId = cinemas[0].id;
    sala =  cinemas[0].salas[0].nome;
    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
});

afterAll( async() => {
        await database.disconnect();
});

test('getAllCities', async () =>// listar cidades cadastradas
{
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();
});

test('getCinemasByCityId', async () => //listar cinemas da cidade
{
    const cinemas = await repository.getCinemasByCityId(cityId);
    expect(cinemas).toBeTruthy();
    expect(Array.isArray(cinemas)).toBeTruthy();
});

test('getMoviesCinemaById', async () => //Todos os filmes de um certo cinema
{
    const movies = await repository.getMoviesCinemaById(cinemaId);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});


test('getMoviesInCityById', async () =>// todos os filmes em uma certa cidade
{
    const movies = await repository.getMoviesInCityById(cityId);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});


test('getSessionMovieById', async () => //listar sessões de um certo filme
{
    const movies = await repository.getSessionMovieById(cityId, movieId);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});


test('getMoviesByTheater', async () => //obter filmes de uma certa sala
{
    const movies = await repository.getMoviesByTheater(cityId, cinemaId, sala);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});

test('addNewCity NEW CITY', async () => 
{
    const dataCity = {
        
        "cidade": "Governador Valadares",
        "uf": "MG",
        "pais": "BR",
        "cinemas": 
        [{
                "id": new ObjectId(),
                "nome": "CinemarK CS",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                    {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                    {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                            "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        },
        {
            "id": new ObjectId(),
                "nome": "CinemarK Bourbon Ipiranga",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                    {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                    {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                            "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        }]
    }
    const response = await repository.addNewCity(dataCity);
    expect(response).toBeTruthy();
    expect(typeof response).toEqual("object");
    expect(response.status).toEqual(201); 
});

test('addNewCity NO CHANGE', async () => 
{
        const dataCity = {
        "cidade": "Juiz de Fora",
        "uf": "MG",
        "pais": "BR",
        "cinemas": 
        [{
                "id": new ObjectId(),
                "nome": "CinemarK CS",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                                "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        },
        {
                "id": new ObjectId(),
                "nome": "CinemarK Bourbon Ipiranga",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                                "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        }]
        }
        const response = await repository.addNewCity(dataCity);
        expect(response.status).toEqual(200);
});

test('addNewCity NEW CINEMA', async () => 
{
        const dataCity = {
        "cidade": "Belo Horizonte",
        "uf": "MG",
        "pais": "BR",
        "cinemas": 
        [{
                "id": new ObjectId(),
                "nome": "CinemarK CS",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                                "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        },
        {
                "id": new ObjectId(),
                "nome": "CinemarK Bourbon Ipiranga",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 2,
                                                "disponivel": true
                                        },
                                                                        {
                                                "numero": 3,
                                                "disponivel": false
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Guerra Infinita",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores: Era Ultron",
                                        "valor": 20.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                },
                {
                        "nome": "02",
                        "sessoes": 
                        [
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 25.00,
                                        "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                },
                                {
                                        "data": "2024-10-01T09:00:00Z",
                                        "idFilme": new ObjectId(),
                                        "filme": "Os Vingadores",
                                        "valor": 40.00,
                                                "assentos": [{
                                                "numero": 1,
                                                "disponivel": true
                                        },{
                                                "numero": 2,
                                                "disponivel": true
                                        },{
                                                "numero": 3,
                                                "disponivel": true
                                        },{
                                                "numero": 4,
                                                "disponivel": true
                                        },{
                                                "numero": 5,
                                                "disponivel": true
                                        }]
                                }
                        ]
                }]
        }]
        }
        const response = await repository.addNewCity(dataCity);
        expect(response).toBeTruthy();
        expect(typeof response).toEqual("object");
        expect(response.status).toEqual(200);
});


test('addNewCity TRHOW ERROR', async () => {
        const response = await repository.addNewCity('66e77cf1bb577e10b1cdcdf8');
        expect(response.status).toEqual(500);
        expect(response.result).toEqual(-1);
        expect(response.message).toBe('Ocorreu um erro ao adicionar o cinema.');
});
        
test('deleteCity CITY NO EXIST', async () =>
{
        const idCity = new ObjectId();
        const response = await repository.deleteCity(idCity);
        expect(response.status).toEqual(404);
});

test('deleteCity OK', async () =>
{
        const city = await repository.getAllCities();
        const idCity = city[city.length-1]._id;
        const response = await repository.deleteCity(idCity);
        expect(response.status).toEqual(204);
});

test('deleteAllCinemasByCityId OK', async () =>{
        const response = await repository.deleteAllCinemasByCityId(firstCity);
        expect(response.status).toEqual(200);
});

test('deleteAllCinemasByCityId NO EXIST CITY', async () =>{

        idCity = new ObjectId();
        const response = await repository.deleteAllCinemasByCityId(idCity);
        expect(response.status).toEqual(404);
});

test('deleteAllCinemasByCityId NO CINEMAS WERE DELETED', async () =>{

        const response = await repository.deleteAllCinemasByCityId(firstCity);
        expect(response.status).toEqual(204);
});

