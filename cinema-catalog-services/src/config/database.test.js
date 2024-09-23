const database = require('./database');

test('Connecting Database', async () =>
{
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('desconnecting Database', async () =>
{
    const isDesconnected = await database.disconnect();
    expect(isDesconnected).toBeFalsy()
}) 

test('desconnecting Database 2', async () =>
{
    const isDesconnected = await database.disconnect();
    expect(isDesconnected).toBeTruthy();
})