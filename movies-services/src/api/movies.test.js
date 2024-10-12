const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const db = require('../config/database');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

const tokenAdmin = "1";
const tokenGuest = "2";

jest.mock('../node_modules/jsonwebtoken', () =>{
    return{
        verify: (token) => {
            if(token === tokenAdmin) return { userId: 1, profileId: 1 }; //Admin
            else if(token === tokenGuest) return { userId: 2, profileId: 2} //Guest
            else throw new Error("Invalid token");                              
        }
    }
} )

let app = null;
beforeAll(async() =>{
   app =  await server.start(movies, repositoryMock);
});

afterAll(async() =>
{
    await db.disconnect();
    await server.stop();
});

test('GET /movies 200 OK tokenAdmin', async () =>
{
    const response = await request(app).get('/movies').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});

test('GET /movies 200 OK tokenGuest', async () =>
{
    const response = await request(app).get('/movies').set('authorization', `Bearer ${tokenGuest}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});

test('GET /movies 401 UNAUTHORIZED (invalid token)', async () =>
{
    const response = await request(app).get('/movies').set('authorization', 'Beares 13');
    expect(response.status).toEqual(401);
});

test('GET /movies 401 UNAUTHORIZED (no-existe token)', async () =>
{
    const response = await request(app).get('/movies');
    expect(response.status).toEqual(401);
});
    

test('GET /movies/:id 200', async () =>
{
    const response = await request(app).get('/movies/1').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /movies/:id 200 OK tokenGuest', async () =>
{
    const response = await request(app).get('/movies/1').set('authorization', `Bearer ${tokenGuest}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
});

test('GET /movies/:id 401 UNAUTHORIZED (invalid token)', async () =>
{
    const response = await request(app).get('/movies/1').set('authorization', 'Beares 13');
    expect(response.status).toEqual(401);
});

test('GET /movies/:id 401 UNAUTHORIZED (no-existe token)', async () =>
{
    const response = await request(app).get('/movies/1');
    expect(response.status).toEqual(401);
});

test('GET /movies/:id 404 NOT FOUND', async () =>
{
    const response = await request(app).get('/movies/-1').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(404);
});

test('GET /movies/:id 401 NO-AUTHORIZED', async () =>
{
    const response = await request(app).get('/movies/-1').set('authorization', `Bearer 223`);
    expect(response.status).toEqual(401);
});

test('GET /movies/:id 401 TOKEN NO-EXISTE', async () =>
{
    const response = await request(app).get('/movies/-1');
    expect(response.status).toEqual(401);
});


test('GET /movies/premieres 200', async () => 
{
    const response = await request(app).get('/movies/premieres').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
});

test('GET /movies/premieres 401 NO-AUTHORIZED', async () =>
{
    const response = await request(app).get('/movies/premieres').set('authorization', `Bearer 223`);
    expect(response.status).toEqual(401);
});

test('GET /movies/premieres401 TOKEN NO-EXISTE', async () =>
{
    const response = await request(app).get('/movies/premieres');
    expect(response.status).toEqual(401);
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

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json").set('authorization', `Bearer ${tokenAdmin}`)
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(201);
});

test('POST /movies/ 403 FORBIDDEN', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "http://teste.jpg",
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json").set('authorization', `Bearer ${tokenGuest}`)
    expect(response.status).toEqual(403);
});

test('POST /movies/ 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "http://teste.jpg",
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json").set('authorization', `Bearer 123`)
    expect(response.status).toEqual(401);
});

test('POST /movies/ 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "http://teste.jpg",
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json");
    expect(response.status).toEqual(401);
});

    
test('POST /movies/ 422 ', async () => 
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date().toDateString(),
        imagem: "teste.jpg",//provoca o erro aqui, pois espera um modelo com "https?//aglumacoisa.algumacoisa"
        categorias: ["Aventura", "Drama"]
    }

    const response = await request(app).post('/movies').send(movie).set("Content-Type", "application/json").set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(422);
});

test("PATCH /movies/:id 200 OK", async () =>{

    const updateMovie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
    }
    const res = await request(app).patch('/movies/66c48f6cbdba192f1ecdcdf8').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenAdmin}`).send(updateMovie);
    expect(res.status).toEqual(200);
});

test('PATCH /movies/:id 403 FORBIDDEN', async () => 
{
    const updateMovie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
    }

    const response = await request(app).patch('/movies/66c48f6cbdba192f1ecdcdf8').set("Content-Type", "application/json").set('authorization', `Bearer ${tokenGuest}`).send(updateMovie);
    expect(response.status).toEqual(403);
});
    
test('PATCH /movies/:id 401 UNAUTHORIZED (INVALID TOKEN)', async () => 
{
    const updateMovie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
    }
    const response = await request(app).patch('/movies/66c48f6cbdba192f1ecdcdf8').set("Content-Type", "application/json").set('authorization', `Bearer 123`).send(updateMovie);
    expect(response.status).toEqual(401);
});

test('PATCH /movies/:id 401 UNAUTHORIZED (WITHOUT TOKEN)', async () => 
{
    const updateMovie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
    }

    const response = await request(app).patch('/movies/66c48f6cbdba192f1ecdcdf8').set("Content-Type", "application/json").send(updateMovie);
    expect(response.status).toEqual(401);
});
   
test('PATCH /movies/:id 422 ', async () => 
{
    const updateMovie = {
        titulos: "Filme teste 1",//ponto de inconsistência dos dados
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
    }

    const response = await request(app).patch('/movies/66c48f6cbdba192f1ecdcdf8').set("Content-Type", "application/json").set('authorization', `Bearer ${tokenAdmin}`).send(updateMovie);
    expect(response.status).toEqual(422);
});

test('PATCH /movies/:id 404 NOT FOUND', async () => 
{
    const response = await request(app).patch('/movies/-1').set("Content-Type", "application/json").set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(404);
});

test("DELETE /delete_movies/:id 204", async () =>
{
    const response = await request(app).delete('/movies/66f4e3f9da7b9694af3411cd').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(204);
});

test("DELETE /delete_movies/:id 403 FORBIDDEN", async () =>
{
    const response = await request(app).delete('/movies/66f4e3f9da7b9694af3411cd').set('authorization', `Bearer ${tokenGuest}`);
    expect(response.status).toEqual(403);
});

test("DELETE /delete_movies/:id 401 UNAUTHORIZED (INVALID TOKEN)", async () =>
{
    const response = await request(app).delete('/movies/66f4e3f9da7b9694af3411cd').set('authorizathion', `Bearer, 231`);
    expect(response.status).toEqual(401);
});

test("DELETE /delete_movies/:id 401 UNAUTHORIZED (WITHOUT TOKEN)", async () =>
{
    const response = await request(app).delete('/movies/66f4e3f9da7b9694af3411cd');
    expect(response.status).toEqual(401);
});

test("DELETE /delete_movies/:id 404 NOT FOUND", async () =>
{
    console.log("Minha vez")
    const response = await request(app).delete('/movies/-1').set('authorization', `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(404);
});

