const { test, afterAll, beforeAll } = require('@jest/globals');
const server = require('./server');
const db = require('../config/database');
const request = require('supertest');

let app = null;
// const apiMock = jest.fn((app, repository) => true)

const apiMock = jest.fn((app, repository) => 
{
    app.get('/error', (req, res, next) => 
    {
        throw new Error("Error Mock");  //para testar o middleware de erro 
    });
});

beforeAll( async() => 
{
    app = await server.start(apiMock);
})

afterAll(async()=>{
    await db.disconnect()
})

test('Server started', async () =>
{
    expect(app).toBeTruthy();
})


test('Server stoped 1', async () =>
{
    const isStoped = await server.stop();
    expect(isStoped).toBeTruthy();
}) 

test('Health Checked', async () =>
{
    const response = await request(app).get('/health');
    expect(response.status).toEqual(200);
})

test('Checked Error', async () =>
{
    const response = await request(app).get('/error');
    expect(response.status).toEqual(500);
}) 

test('Server stoped 2', async () =>
{
    const isStoped = await server.stop();
    expect(isStoped).toBeTruthy();
}) 