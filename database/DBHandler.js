const config = require('config')
const { Pool } = require('pg')

class DBHandler {
  client

  constructor() {
    this.client = this.initializeDB()
  }

  initializeDB() {

    return new Pool({
      user: config.dbConfig.user,
      host: config.dbConfig.host,
      database: config.dbConfig.dbName,
      password: config.dbConfig.password,
      port: config.dbConfig.port,
    });
  }
}

module.exports = new DBHandler();
