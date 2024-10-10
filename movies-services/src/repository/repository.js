const database = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllMovies()
{
    const db = await database.connect();
    return db.collection('movies').find({}).toArray();
}

async function getMovieById(id)
{
    const db = await database.connect();
    return db.collection('movies').findOne({ _id: new ObjectId(id)});
    // return db.collection('movies').findOne({ _id: ObjectId.createFromHexString(id)});
}

async function getMoviePrimieres()
{
    const monthAgo = new Date();
    monthAgo.setMonth( monthAgo.getMonth()-1 );
    const db = await database.connect();
    return db.collection('movies').find({dataLancamento: { $gte: monthAgo } }).toArray();
}

async function addMovie(dataMovie)
{
    const db = await database.connect();
    const response = await db.collection('movies').insertOne(dataMovie);
    dataMovie._id = response.insertedId;
    return dataMovie;
}

async function updateMovie(idMovie, dataUpdate)
{
    const movieId = new ObjectId(idMovie);
    const db = await database.connect();

    const existingMovie = await db.collection('movies').findOne({ _id: movieId });
    if(!existingMovie) return -1

    const response = await db.collection('movies').updateOne( {_id: movieId }, {$set: dataUpdate});
    return response;
}

async function deleteMovie(idMovie)
{
    const movieId = new ObjectId(idMovie);
    const db = await database.connect();
    const response = await db.collection('movies').deleteOne({_id: movieId });
    if(response.deletedCount === 0) return -1
    return
}
 
module.exports = { getAllMovies, getMovieById, getMoviePrimieres, addMovie, deleteMovie, updateMovie }
