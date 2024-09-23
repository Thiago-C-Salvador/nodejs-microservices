const database = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllCities()
{
    const db = await database.connect();
    // db.collection('catalogCinema').find({}, {cidade: 1 , uf: 1}) //assim se usa diretament no client do mongo
    return db.collection('catalogCinema').find({})
    .project({cidade: 1 , uf: 1})
    .toArray();
}

async function getCinemasByCityId(cityId)
{
    const objectCityId = new ObjectId(cityId);
    const db = await database.connect();
    const city = await db.collection('catalogCinema').findOne({ _id: objectCityId }, { projection: { cinemas: 1 } })
    // const group = await db.collection('catalogCinema').aggregate([
    //     { $match: { "_id": objectCityId }},
    //     { $unwind: "$cinemas" },
    //     { $group: { _id: { nome_cinema: "$cinemas.nome", idCinema:"$cinemas.id" } }}
    // ]).toArray();
    return city.cinemas
    // return group.map(cinemas => cinemas._id)
}

async function getMoviesCinemaById(cinemaId)
{
    const objectCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const gorup = await db.collection('catalogCinema').aggregate([
        { $match: { "cinemas.id": objectCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"} }}
    ]).toArray();
    return gorup.map(filmes => filmes._id)
}

async function getMoviesInCityById(cityId)
{
    const objectCityId = new ObjectId(cityId);
    const db = await database.connect();
    const gorup = await db.collection('catalogCinema').aggregate([
        { $match: { "_id": objectCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"} }}
    ]).toArray();
    return gorup.map(filmes => filmes._id)
}

async function getSessionMovieById(cityId, movieId)
{
    const objectCityId = new ObjectId(cityId);
    const objectMovieId = new ObjectId(movieId);
    const db = await database.connect();
    const gorup = await db.collection('catalogCinema').aggregate([
        { $match: { "_id": objectCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: {"cinemas.salas.sessoes.idFilme": objectMovieId } },
        { $group: { _id: {
            Titulo: "$cinemas.salas.sessoes.filme", 
            idFilme: "$cinemas.salas.sessoes.idFilme",
            cinema: "$cinemas.nome",
            idCinema: "$cinemas.id",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes.data"
            }
        }
    }
    ]).toArray();
    return gorup.map(filmes => filmes._id)
}


async function getMoviesByTheater(cityId, cinemaId, movie_thearter)
{
    const objectCityId = new ObjectId(cityId);
    const objectCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const gorup = await db.collection('catalogCinema').aggregate([
        { $match: { "_id": objectCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: {"cinemas.id": objectCinemaId } },
        { $match: {"cinemas.salas.nome": parseInt(movie_thearter) } },
        { $group: { _id: {
            Titulo: "$cinemas.salas.sessoes.filme", 
            idFilme: "$cinemas.salas.sessoes.idFilme",
            cinema: "$cinemas.nome",
            idCinema: "$cinemas.id",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes.data"
            } 
        }
    }
    ]).toArray();
    return gorup.map(filmes => filmes._id)
}

module.exports = { getAllCities, getCinemasByCityId, getMoviesCinemaById, getMoviesInCityById, getSessionMovieById, getMoviesByTheater }
