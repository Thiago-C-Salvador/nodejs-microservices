function ObjectId(str){
    const { ObjectId } = require("mongodb");
    if (str) return new ObjectId(str);
    return ObjectId.generate();
}

function ISODate(str){
    return new Date(str)
}

const cinemaCatalog =
[
    {
        _id: ObjectId(),
        cidade: "Governador Valadares",
        uf: "MG",
        pais: "BR",
        cinemas:[]
    },
    {
        _id: ObjectId(),
        cidade: "Belo Horizonte",
        uf: "MG",
        pais: "BR",
        cinemas: 
        [{
            id: ObjectId(),
            nome: "CinemarK Bourbon Ipiranga",
            salas:
            [{ 
                nome: 1,
                sessoes: 
                [
                    {
                        data: ISODate("2024-09-16T09:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf6'),
                        filme: "Os Vingadores: Guerra Infinita",
                        valor: 25.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T11:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf6'),
                        filme: "Os Vingadores: Guerra Infinita",
                        valor: 25.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T15:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf7'),
                        filme: "Os Vingadores: Era Ultron",
                        valor: 20.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    }
                ]
            },
            {
                nome: 2,
                sessoes: 
                [
                    {
                        data: ISODate("2024-09-16T09:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf8'),
                        filme: "Os Vingadores",
                        valor: 25.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T11:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf8'),
                        filme: "Os Vingadores",
                        valor: 25.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T15:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf8'),
                        filme: "Os Vingadores",
                        valor: 40.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    }
                ]
            }]
        },
        {
            id: ObjectId(),
            nome: "Cine Center Horto Magaberas",
            salas:
            [{
                nome: 1,
                sessoes: 
                [
                    {
                        data: ISODate("2024-09-16T09:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf8'),
                        filme: "Os Vingadores",
                        valor: 40.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T11:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf6'),
                        filme: "Os Vingadores: Guerra Infinita",
                        valor: 25.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T15:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf8'),
                        filme: "Os Vingadores",
                        valor: 40.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    }
                ]

            },
            {
                
                nome: 2,
                sessoes: 
                [   
                    {
                        data: ISODate("2024-09-16T09:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf7'),
                        filme: "Os Vingadores: Era Ultron",
                        valor: 45.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: false
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T11:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf7'),
                        filme: "Os Vingadores: Era Ultron",
                        valor: 45.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: false
                        }]
                    },
                    {
                        data: ISODate("2024-09-14T15:00:00Z"),
                        idFilme: ObjectId('66c48f6cbdba192f1ecdcdf6'),
                        filme: "Os Vingadores: Guerra Infinita",
                        valor: 40.00,
                        assentos: [{
                            numero: 1,
                            disponivel: true
                        },{
                            numero: 2,
                            disponivel: true
                        },{
                            numero: 3,
                            disponivel: true
                        }]
                    }
                ]
            }]
        }]
    }
];

function getAllCities()
{
    return cinemaCatalog.map(catalog => {
        return {
            _id: new ObjectId(),
            pais: catalog.pais,
            uf: catalog.uf,
            cidade: catalog.cidade,
        }
   })

}

function getCinemasByCityId(cityId)
{
    if(cityId < 0 ) return []
    return cinemaCatalog[cinemaCatalog.length - 1].cinemas
}

function getMoviesCinemaById(cinemaId)
{
    if(cinemaId < 0 ) return []
    return getCinemasByCityId().map( cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme
        }
    })
}

async function getMoviesInCityById(cityId)
{
    if(cityId < 0 ) return []
    return getMoviesCinemaById()
}

async function getSessionMovieById(cityId, movieId)
{
    if(cityId < 0 || movieId < 0 ) return []
    return getCinemasByCityId().map( cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme,
            cinema: cinema.nome,
            idCinema: cinema.id,
            sala: cinema.salas[0].nome,
            sessao: cinema.salas[0].sessoes[0]
        }
    })
}

async function getMoviesByTheater(cityId, cinemaId, movie_thearter)
{
    if(cityId < 0 || cinemaId < 0 || movie_thearter < 0 ) return []
    return getSessionMovieById()
}

module.exports = { getAllCities, getCinemasByCityId, getMoviesCinemaById, getMoviesInCityById, getSessionMovieById, getMoviesByTheater }

