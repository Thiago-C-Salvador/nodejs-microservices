[
    {
        cidade: "Governador Valadares",
        uf: "MG",
        pais: "BR",
        cinemas:[]
    },
    {
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
]