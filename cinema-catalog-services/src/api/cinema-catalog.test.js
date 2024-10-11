const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const db = require('../config/database')
const cinemaCatalog = require('./cinema-catalog')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

let app = null;

//Mock do token, para poder realizar teste de nível de usuário e falta de totken ou token válido.
const tokenAdmin = "1";
const tokenGuest = "2";
jest.mock('../node_modules/jsonwebtoken', () =>{
    return{
        verify: (token) => {
            if(token === tokenAdmin) return { userId: 1, profileId: 1 };
            if(token === tokenGuest) return { userId: 2, profileId: 2 };
            else throw new Error("Invalid token");                   
        }
    }
});

beforeAll(async() =>{
    process.env.PORT = 3080
    app =  await server.start(cinemaCatalog, repositoryMock);
});

afterAll(async() =>
{
    await db.disconnect();
    await server.stop();
});

test('GET /allCities 200', async () =>
{
    const response = await request(app).get('/cities').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});


test('GET /cinemas_in_city/:cityId 200', async () =>
{
    const response = await request(app).get('/cinemas_in_city/1').set('authorization', `Bearer ${tokenAdmin}`);// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /cinemas_in_city/:cityId 401 UNAUTHORIZED (INVALID TOKEN)', async () =>
{
    const response = await request(app).get('/cinemas_in_city/1').set('authorization', `Bearer 213`)//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /cinemas_in_city/:cityId 401 UNAUTHORIZED (WITHOUT TOKEN)', async () =>
{
    const response = await request(app).get('/cinemas_in_city/1').set(new Error())//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /cinemas_in_city/:cityId 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/cinemas_in_city/-1').set('authorization', `Bearer ${tokenAdmin}`);//-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_cinema/:id 200', async () =>
{
    const response = await request(app).get('/movies_by_cinema/1').set('authorization', `Bearer ${tokenAdmin}`);// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /movies_by_cinema/:id 401 UNAUTHORIZED (INVALID TOKEN)', async () =>
{
    const response = await request(app).get('/movies_by_cinema/1').set('authorization', `Bearer 213`)//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /movies_by_cinema/:id 401 UNAUTHORIZED (WITHOUT TOKEN)', async () =>
{
    const response = await request(app).get('/movies_by_cinema/1').set(new Error())//token inexistente;
    expect(response.status).toEqual(401);
});


test('GET /movies_by_cinema/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies_by_cinema/-1').set('authorization', `Bearer ${tokenAdmin}`); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_in_city/:id 200', async () =>
{
    const response = await request(app).get('/movies_in_city/1').set('authorization', `Bearer ${tokenAdmin}`);// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /movies_in_cinema/:id 401 UNAUTHORIZED (INVALID TOKEN)', async () =>
{
    const response = await request(app).get('/movies_in_city/1').set('authorization', `APIKey 213`)//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /movies_in_cinema/:id 401 UNAUTHORIZED (WITHOUT TOKEN)', async () =>
{
    const response = await request(app).get('/movies_in_city/1').set(new Error())//token inexistente;
    expect(response.status).toEqual(401);
});
    
test('GET /movies_in_city/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies_in_city/-1').set('authorization', `Bearer ${tokenAdmin}`); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /sessions_of_movie/city/:id_city/movie/:id_movie 200', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/1/movie/1').set('authorization', `Bearer ${tokenAdmin}`);// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /sessions_of_movie/city/:id_city/movie/:id_movie401 UNAUTHORIZED (INVALID TOKEN)', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/1/movie/1').set('authorization', `Bearer 213`)//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /sessions_of_movie/city/:id_city/movie/:id_movie 401 UNAUTHORIZED (WITHOUT TOKEN)', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/1/movie/1').set(new Error())//token inexistente;
    expect(response.status).toEqual(401);
});
    
test('GET /sessions_of_movie/city/:id_city/movie/:id_movie 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/-1/movie/-1').set('authorization', `Bearer ${tokenAdmin}`);//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter 200', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/1/cinema/1/sala/1').set('authorization', `Bearer ${tokenAdmin}`);// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /sessions_of_movie/city/:id_city/movie/:id_movie401 UNAUTHORIZED (INVALID TOKEN)', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/1/cinema/1/sala/1').set('authorization', `Bearer 213`)//token inexistente;
    expect(response.status).toEqual(401);
});

test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter 401 UNAUTHORIZED (WITHOUT TOKEN)', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/1/cinema/1/sala/1').set(new Error())//token inexistente;
    expect(response.status).toEqual(401);
});
    
test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter NOT FOUND 404', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/-1/cinema/-1/sala/-1').set('authorization', `Bearer ${tokenAdmin}`);//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});

test('PUT /cityAndCinema/ CREATED 201', async () => {

    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": [{
                "id": "22ew",
                "nome": "CinemarK TCS",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
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
                                        "idFilme": "213",
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

    const response = await request(app).put('/cityAndCinema').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`).send(city);
    expect(response).toBeTruthy();
    expect(response.status).toBe(201);
})

test('PUT /cityAndCinema/ 403 FORBIDDEN', async () =>{

    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }
    const response = await request(app).put('/cityAndCinema').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenGuest}`).send(city);
    expect(response.status).toBe(403);
})

test('PUT /cityAndCinema/ 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).put('/cityAndCinema').send(city).set("Content-Type", "application/json").set('authorization', `Bearer 123`);
    expect(response.status).toEqual(401);
});
    
test('PUT /cityAndCinema/ 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).put('/cityAndCinema').send(city).set("Content-Type", "application/json");
    expect(response.status).toEqual(401);
});

        
test('PUT /cityAndCinema/ 422 ', async () => 
{
    const city = {
        "cidade": "Vi",//Erro provocado
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).put('/cityAndCinema').send(city);
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(422);
});

test('PATCH /addCinema/:id/ CREATED 201', async () => {

    const cinema = {
        "cidade": "Belo Horizonte",
        "uf": "MG",
        "pais": "BR",
        "cinemas": [{
                "nome": "CinemarK SmallVille",
                "salas":[{ 
                        "nome": "01",
                        "sessoes": [
                                {
                                        "data": "2024-10-01",
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
                                        "idFilme": "213",
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
    const response = await request(app).patch('/addCinema/6703fd6be8d0d95d5cb403cb').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`).send(cinema);
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
})

test('PATCH /addCinema/:id/ 403 FORBIDDEN', async () =>{

    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }
    const response = await request(app).patch('/addCinema/6703fd6be8d0d95d5cb403cb').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenGuest}`).send(city);
    expect(response.status).toBe(403);
})

test('PATCH /addCinema/:id/ 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).patch('/addCinema/6703fd6be8d0d95d5cb403cb').send(city).set("Content-Type", "application/json").set('authorization', `Bearer 123`);
    expect(response.status).toEqual(401);
});
    
test('PATCH /addCinema/:id/ 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const city = {
        "cidade": "Vitória",
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).patch('/addCinema/6703fd6be8d0d95d5cb403cb').send(city).set("Content-Type", "application/json")
    expect(response.status).toEqual(401);
});

        
test('PATCH /addCinema/:id/ 422 ', async () => 
{
    const city = {
        "cidade": "Vi",//Erro provocado
        "uf": "ES",
        "pais": "BR",
        "cinemas": []
    }

    const response = await request(app).patch('/addCinema/6703fd6be8d0d95d5cb403cb').send(city)
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(422);
});

test('DELETE /city/:id OK', async () => {
    const response = await request(app).delete('/city/23123').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response).toBeTruthy();
});

test('DELETE /city/:id CITY NOT FOUND', async () => {
    const response = await request(app).delete('/city/-1').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(404);
});

test('DELETE /city/:id/ 403 FORBIDDEN', async () =>{
    const response = await request(app).delete('/city/6703fd6be8d0d95d5cb403cb').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenGuest}`);
    expect(response.status).toBe(403);
})

test('DELETE /city/:id/ 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const response = await request(app).delete('/city/6703fd6be8d0d95d5cb403cb').set("Content-Type", "application/json").set('authorization', `Bearer 123`)
    expect(response.status).toEqual(401);
});
    
test('DELETE /city/:id/ 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const response = await request(app).delete('/city/6703fd6be8d0d95d5cb403cb').set("Content-Type", "application/json");
    expect(response.status).toEqual(401);
});


test('DELETE /cinemas/:idCity  OK', async () => {
    const response = await request(app).delete('/cinemas/23123').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`)
    expect(response).toBeTruthy();
});

test('DELETE /cinemas/:idCity CITY NOT FOUND', async () => {
    const response = await request(app).delete('/cinemas/-1').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(204);
});


test('DELETE /cinemas/:id/ 403 FORBIDDEN', async () =>{
    const response = await request(app).delete('/cinemas/6703fd6be8d0d95d5cb403cb').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenGuest}`);
    expect(response.status).toBe(403);
})

test('DELETE /cinemas/:id/ 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const response = await request(app).delete('/cinemas/6703fd6be8d0d95d5cb403cb').set("Content-Type", "application/json").set('authorization', `Bearer 123`)
    expect(response.status).toEqual(401);
});
    
test('DELETE /cinemas/:id/ 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const response = await request(app).delete('/cinemas/6703fd6be8d0d95d5cb403cb').set("Content-Type", "application/json");
    expect(response.status).toEqual(401);
});
