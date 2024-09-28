const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const db = require('../config/database')
const cinemaCatalog = require('./cinema-catalog')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

let app = null;

const tokenValido = "1";
jest.mock('../node_modules/jsonwebtoken', () =>{
    return{
        verify: (token) => {
            if(token === tokenValido) return { userId: 1, profileId: 1 };                         
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
    const response = await request(app).get('/allCities').set('authorization', `Bearer ${tokenValido}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});


test('GET /cinemas_in_city/:cityId 200', async () =>
{
    const response = await request(app).get('/cinemas_in_city/1').set('authorization', `Bearer ${tokenValido}`);// qualquer valor inteiro positivo retornará algo;
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
    const response = await request(app).get('/cinemas_in_city/-1').set('authorization', `Bearer ${tokenValido}`);//-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_cinema/:id 200', async () =>
{
    const response = await request(app).get('/movies_by_cinema/1').set('authorization', `Bearer ${tokenValido}`);// qualquer valor inteiro positivo retornará algo;
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
    const response = await request(app).get('/movies_by_cinema/-1').set('authorization', `Bearer ${tokenValido}`); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_in_city/:id 200', async () =>
{
    const response = await request(app).get('/movies_in_city/1').set('authorization', `Bearer ${tokenValido}`);// qualquer valor inteiro positivo retornará algo;
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
    const response = await request(app).get('/movies_in_city/-1').set('authorization', `Bearer ${tokenValido}`); //-1 para forçar ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /sessions_of_movie/city/:id_city/movie/:id_movie 200', async () =>
{
    const response = await request(app).get('/sessions_of_movie/city/1/movie/1').set('authorization', `Bearer ${tokenValido}`);// qualquer valor inteiro positivo retornará algo;
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
    const response = await request(app).get('/sessions_of_movie/city/-1/movie/-1').set('authorization', `Bearer ${tokenValido}`);//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});


test('GET /movies_by_thearter/city/:id_city/cinema/:id_cinema/sala/:movie_thearter 200', async () =>
{
    const response = await request(app).get('/movies_by_thearter/city/1/cinema/1/sala/1').set('authorization', `Bearer ${tokenValido}`);// qualquer valor inteiro positivo retornará algo;
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
    const response = await request(app).get('/movies_by_thearter/city/-1/cinema/-1/sala/-1').set('authorization', `Bearer ${tokenValido}`);//-1 para um parâmetro que seja, forçará ser menor de que zero ou vazio o retorno
    expect(response.status).toEqual(404);
});



