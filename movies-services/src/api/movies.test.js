const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const db = require('../config/database');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

// const app = (async () => { await server.start(movies, repositoryMock )})();
let app = null;

beforeAll(async() =>{
   app =  await server.start(movies, repositoryMock);
})

afterAll(async() =>
{
    await db.disconnect();
    await server.stop();
})

test('GET /movies 200', async () =>
{
    const response = await request(app).get('/movies');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});


test('GET /movies/:id 200', async () =>
{
    const response = await request(app).get('/movies/1');// qualquer valor que eu passar ele vai retorna o filme na posiçao 1;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

//fora o teste do movieById, não faz sentido testar as outras rota, pois no máximo que será rtornado vai ser um array vazio uma vez, que pode ter ou não filme cadastrados que satisfaça a condição da rota "/movies/primieres" e "/movies"
test('GET /movies/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies/-1');
    expect(response.status).toEqual(404);
});


test('GET /movies/premieres 200', async () => 
{
    const response = await request(app).get('/movies/premieres');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});

test('POST /movies/ 201 OK', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "http://teste.jpg",
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json")
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(201);
});


test('POST /movies/ 422 NOT FOUND', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "teste.jpg",
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json")
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(422);
});

test("DELETE /delete_movies/:id 204", async () =>
{
    const response = await request(app).delete('/delete_movie/66ea43617976da3a1fd01da3');
    expect(response.status).toEqual(204);
})

