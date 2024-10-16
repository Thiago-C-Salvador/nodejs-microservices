//criar um index que controla o tempo que os dados da collection blackList irá permacenar registrada no banco de dados
db.blackList.createIndex({ data: 1 },{  expireAfterSeconds: 1800 });