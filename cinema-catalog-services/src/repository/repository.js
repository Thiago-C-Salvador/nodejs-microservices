const database = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllCities()
{
    const db = await database.connect();
    return db.collection('catalogCinema').find({})
    .project({cidade: 1 , uf: 1})
    .toArray();
}

async function getCinemasByCityId(cityId)
{
    const objectCityId = new ObjectId(cityId);
    const db = await database.connect();
    const city = await db.collection('catalogCinema').findOne({ _id: objectCityId }, { projection: { cinemas: 1 } })
    return city.cinemas
}

async function getMoviesCinemaById(cinemaId)
{
    const objectCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const group = await db.collection('catalogCinema').aggregate([
        { $match: { "cinemas.id": objectCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"} }}
    ]).toArray();
    return group.map(filmes => filmes._id)
}

async function getMoviesInCityById(cityId)
{
    const objectCityId = new ObjectId(cityId);
    const db = await database.connect();
    const group = await db.collection('catalogCinema').aggregate([
        { $match: { "_id": objectCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"} }}
    ]).toArray();
    return group.map(filmes => filmes._id)
}

async function getSessionMovieById(cityId, movieId)
{
    const objectCityId = new ObjectId(cityId);
    const objectMovieId = new ObjectId(movieId);
    const db = await database.connect();
    const group = await db.collection('catalogCinema').aggregate([
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
    return group.map(filmes => filmes._id)
}


async function getMoviesByTheater(cityId, cinemaId, movie_thearter)
{
    const objectCityId = new ObjectId(cityId);
    const objectCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const group = await db.collection('catalogCinema').aggregate([
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
    return group.map(filmes => filmes._id)
}

async function addNewCity(dataCinema)
{
    const db = await database.connect();
    const allCities = await getAllCities();
    const searchCriteria = { cidade: dataCinema.cidade, uf: dataCinema.uf };
    const index = allCities.findIndex( found => found.cidade === searchCriteria.cidade && found.uf === searchCriteria.uf);
    try{
        if(index === -1){
            const response = await db.collection('catalogCinema').insertOne(dataCinema);
            dataCinema._id = response.insertedId;
            return { status: 201, message: 'Cinema criado com sucesso.', data: dataCinema }; // 201 CREATE
        }

        //aqui deve retornar uma mensagem para o usuário informando que a cidade já existe, mas se o mesmo pretender continuar com o cadastro (na verdade atualização), só ocorrerá caso alguns do cinema(as) informado(dos) não exista na cidade informada.
        //Logo a sequência deveria ser uma outra função que será avocada a depender do evento do click/ação do usuário, ou seja uma rota "/cinema" com o verbo PATCH.
        const idCity = (allCities[index]._id);
        return await newCinema(idCity, dataCinema)
    }
    catch(error){
        console.error("Erro ao adicionar cinema:", error);
        return {result: -1, status: 500, message: 'Ocorreu um erro ao adicionar o cinema.', error: error.message }; 
    }
}

// Em caso de tentar cadastrar cidade que já esteja cadastrada, mas com algum cinema que não exista, então será criado o novo cinema para a cidade.
async function newCinema(id_city, dataCinema) {
    const idCity = new ObjectId(id_city)
    const db = await database.connect();
    const city = await db.collection('catalogCinema').findOne({ _id: idCity });
    if(city){ 
        let new_cinema= false; 
        dataCinema.cinemas.forEach(cinema => { 
        const verifyCinemas = city.cinemas.some(verifica => verifica.nome === cinema.nome)
            if(!verifyCinemas){
                city.cinemas.push(cinema);
                new_cinema = true;
            }  
        });
        if(new_cinema)
        {
            const response = await db.collection('catalogCinema').updateOne({ _id: idCity }, { $set: { cinemas: city.cinemas } });
            return { status: 200, modifiedCount: response.modifiedCount, updatedCity: city };
        }
    }
    return { status: 200, message: 'A cidade informada não existe na base de dados.' };   
}

async function deleteCity(idCity)
{
    const cityId = new ObjectId(idCity);
    const db = await database.connect();
    try {
        const response = await db.collection('catalogCinema').deleteOne({ _id: cityId  });
        if (response.deletedCount === 0) {
            return { status: 404, message: 'Cidade não encontrado.' };
        }
        return { status: 204 }; // No Content
    } catch (error) {
        console.error("Erro ao tentar deletar cidade:", error);
        return { status: 500, message: 'Erro ao deletar o cidade.', error: error.message };
    }
}

// Função para deletar todos os cinemas de uma cidade
async function deleteAllCinemasByCityId(cityId) {
    const idCity = new ObjectId(cityId);
    const db = await database.connect();    
    try {
        // Verifica se a cidade existe
        const city = await db.collection('catalogCinema').findOne({ _id: idCity });

        if (!city) {
            return { status: 404, message: 'Cidade não encontrada.' };
        }

        // Remove todos os cinemas da cidade
        const result = await db.collection('catalogCinema').updateOne(
            { _id: idCity },
            { $set: { cinemas: [] } }
        );
        if (result.modifiedCount > 0) {
            return { status: 200, message: 'Todos os cinemas foram deletados com sucesso.' };
        } else {
            return { status: 204, message: 'Nenhum cinema foi deletado.' };
        }
    } catch (error) {
        console.error("Erro ao deletar cinemas:", error);
        return { status: 500, message: 'Erro ao deletar cinemas.' };
    }
}
module.exports = { getAllCities, getCinemasByCityId,
                    getMoviesCinemaById, getMoviesInCityById,
                    getSessionMovieById, getMoviesByTheater, 
                    addNewCity, newCinema, deleteCity, deleteAllCinemasByCityId}
