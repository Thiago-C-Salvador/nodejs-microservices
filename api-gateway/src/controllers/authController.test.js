process.env.PORT= 4012;
const request = require('supertest');
const repository = require('../repository/repository');
const { server } = require('../server/index');
const { ObjectId } = require('mongodb')

const login = {//substitua pelos dados que tenha em sua base de daddos
    email: "thiago@gmail.com",
    password: "123456",
}

const app = server;
let token = "";
let tokenBlackList = new ObjectId().toHexString();

beforeAll( async () => { 
    const response = await request(app).post('/login/').set('Content-Type', 'application/json').send(login);
    token = response.body.token;
    await repository.insertBlackListToken(tokenBlackList);
})

afterAll( async () => {
    await app.close();
})

test('POST login 200 OK', async () =>{
    const response = await request(app).post('/login/').set('Content-Type', 'application/json').send(login);
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
});

test('POST login USE NO-EXISTENT', async () =>{
    const response = await request(app).post('/login/').set('Content-Type', 'application/json').send({email: 'thiago@uol.com', password:'12390568'});
    expect(response.status).toEqual(400);
});

test('POST login ERROR PASSWORD', async () =>{
    const response = await request(app).post('/login/').set('Content-Type', 'application/json').send({email: login.email, password:'12390568'});
    expect(response.status).toEqual(400);
});

test('POST login 422 UNPROCESSIBLE ENTRY', async () =>{
    login.data = new Date();
    const response = await request(app).post('/login/').set('Content-Type', 'application/json').send(login);
});

test('POST logout 200 OK', async () =>{
    const response = await request(app).post('/logout/').set('Content-Type', 'application/json').set('authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
});

test('POST logout 400 BAD_REQUEST', async () =>{
    const response = await request(app).post('/logout/').set('Content-Type', 'application/json').set('authorization', new Error());
    expect(response.status).toEqual(400);
});

test('POST logout 400 (blackList)', async () =>{
    const response = await request(app).post('/logout/').set('Content-Type', 'application/json').set('authorization', '');
    expect(response.status).toEqual(400);
});


test('POST logout 401 (blackList)', async () =>{
    const response = await request(app).post('/logout/').set('Content-Type', 'application/json').set('authorization', `Bearer ${tokenBlackList}`);
    expect(response.status).toEqual(401);
});





