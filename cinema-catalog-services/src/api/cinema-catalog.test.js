const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const db = require('../config/database')
const cinemaCatalog = require('./cinema-catalog')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

let app = null;

beforeAll(async() =>{
    process.env.PORT = 3080
    app =  await server.start(cinemaCatalog, repositoryMock);
})

afterAll(async() =>
{
    await db.disconnect();
    await server.stop();
})

test('GET /allCities 200', async () =>
{
    const response = await request(app).get('/allCities');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});


test('GET /cinemas_in_city/:cityId 200', async () =>
{
    const response = await request(app).get('/cinemas_in_city/1');// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});


test('GET /cinemas_in_city/:cityId 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/cinemas_in_city/-1'); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_cinema/:id 200', async () =>
{
    const response = await request(app).get('/movies_by_cinema/1');// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});


test('GET /movies_by_cinema/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies_by_cinema/-1'); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_in_city/:id 200', async () =>
{
    const response = await request(app).get('/movies_in_city/1');// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});


test('GET /movies_in_city/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies_in_city/-1'); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /sessions_of_movie/city/:id_city/movie/:id_movie 200', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/1/movie/1');// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});
    
    
test('GET /sessions_of_movie/city/:id_city/movie/:id_movie NOT FOUND 400', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/-1/movie/-1');//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter 200', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/1/cinema/1/sala/1');// qualquer valor inteiro positivo retornará algo;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});
    
    
test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter NOT FOUND 400', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/-1/cinema/-1/sala/-1');//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});



