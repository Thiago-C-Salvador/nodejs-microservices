const movies = [
    [{
        "_id": "66c48f6cbdba192f1ecdcdf6",
        "titulo": "Os Vingadores: Guerra Infinita",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Thanos",
        "duracao": 120,
        "dataLancamento": new Date("2024-09-01T00:00:00.000Z"),
        "imagem": "https://movienonsense.com/wp-content/uploads/2018/04/avengers-infinity-war.jpg?w=1200",
        "categorias": [
          "Aventura",
          "Ação"
        ]
      },
      {
        "_id":  "6c48f6cbdba192f1ecdcdf7",
        "titulo": "Os Vingadores: Era Ultron",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Utron",
        "duracao": 110,
        "dataLancamento": new Date("2024-08-25T00:00:00.000Z"),
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn16xVxCTdA-tDgvgNVpfXfIKtcPj9RMHl_aQpVhi_YQ6hesu-Z2lJutrf0uxh46VJyYI&usqp=CAU",
        "categorias": [
          "Aventura",
          "Ação"
        ]
      },
      {
        "_id": "66c48f6cbdba192f1ecdcdf8",
        "titulo": "Os Vingadores",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Loki",
        "duracao": 100,
        "dataLancamento": new Date("2016-05-01T00:00:00.000Z"),
        "imagem": "https://cinema10.com.br/upload/featuredImage.php?url=https%3A%2F%2Fcinema10.com.br%2Fupload%2Ffilmes%2Ffilmes_9729_MV5BMTkxNTQzNTg4Nl5BMl5BanBnXkFtZTgwMzYzNDQ2NzM%40._V1_SY1000_CR0%2C0%2C674%2C1000_AL_.jpg",
        "categorias": [
          "Aventura",
          "Ação"
        ]
      }]
];

async function getAllMovies()
{
    return movies
}

async function getMovieById(id)
{   
    if(id == -1) return null;
    return movies[0]
}

async function getMoviePrimieres()
{
    movies[0].dataLancamento = new Date();
    return [movies[0]]
}

async function addMovie(movie)
{
    return [movies[0]];
}

async function updateMovie(movie)
{
    if(movie == -1) return -1
    return [movies[0]];
}

async function deleteMovie(movieId)
{
    if(movieId === "-1") return -1;
    return true;
}

module.exports = { getAllMovies, getMovieById, getMoviePrimieres, addMovie, deleteMovie, updateMovie }
