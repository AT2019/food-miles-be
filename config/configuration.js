const ENV = process.env.NODE_ENV || 'prod';

const { username, password, host, dbName } = require(`./config-${ENV}`)

const db = {
  url: `mongodb://${username}:${password}@${host}:27017/${dbName}`
};

console.log(`connecting to ${db.url}`)

module.exports = db;