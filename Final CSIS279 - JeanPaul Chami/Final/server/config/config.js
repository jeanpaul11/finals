var config = {
  PORT: 27017,
  NODE_ENV: 'development',
  HOST: 'localhost',
  DB: 'mydb',
  Collection: ['Users', 'Prices', 'Items', 'Transactions'],
}

module.exports = { config: config };