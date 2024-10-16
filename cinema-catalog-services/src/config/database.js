const MongoClient = require('mongodb').MongoClient

let client = null;

async function connect()
{
    
    if(!client) client = new MongoClient(process.env.MONGO_CONNECTION);
    await client.connect();
    const db = client.db(process.env.DATABASE);
    console.log(`Data base ${db.namespace} started with success at address ${process.env.MONGO_CONNECTION}`);
    return db;
}

async function disconnect()
{
    if(!client) return true
    {
        await client.close();
        client = null;
        console.log('Database connection closed.');
        return
    }

}

module.exports = { connect, disconnect }
