const repository = require('../repository/repository');
const database = require('../config/database');
let testeMoveiId = null

beforeAll( async () =>
{
    const movies = await repository.getAllMovies();
    testeMoveiId = movies[0]._id;
})

test('getAllMovies', async () =>
{
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})


test('getMovieById', async () =>
{
    const movieId = await repository.getMovieById(testeMoveiId);
    expect(movieId._id).toBeTruthy();
    expect(movieId._id).toEqual(testeMoveiId);
}) 

test('getMoviePrimieres', async () =>
{
    const monthAgo = new Date();
    monthAgo.setMonth(-1)
    const movies = await repository.getMoviePrimieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
})

test('addMovie', async () =>
{
    const movie = {
        titulo: "Filme teste 1",
        sinopse: "Um filme teste para o jest teste",
        duracao: 120,
        dataLancamento: new Date(),
        imagem: "http://teste.png",
        categorias: ["Aventura", "Drama"]
    }
    // let response;
    // try{
        const response = await repository.addMovie(movie);
        expect(response).toBeTruthy();
    // }
    // finally{
    //     if(response)
    //     await repository.deleteMovie(response._id)
    // }
})

test('deleteMovie', async () =>
{
    const todosOsFilmes = await repository.getAllMovies();
    const idFilme = todosOsFilmes[todosOsFilmes.length - 1]._id;
    const response = await repository.deleteMovie(idFilme);
    expect(response).toBeTruthy();
    expect(typeof response).toEqual("object")
})

test('desconnecting Database', async () =>
{
    const isDesconnection = await database.disconnect();
    expect(isDesconnection).toEqual(false);
}) 


test('desconnecting Database 2', async () =>
{
    const isDesconnection = await database.disconnect();
    expect(isDesconnection).toBeTruthy();
})