//index.js
const cinemas = require('./api/cinema-catalog');
const repository = require('./repository/repository')
const server = require('./server/server');

(async () =>
{
    try
    {
        await server.start(cinemas, repository)
    }
    catch(error)
    {
        console.error(error)
        throw new Error(error)
    }
})();