const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Url = db.define('url', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: Sequelize.STRING,
  },
  parsed: {
    type: Sequelize.BOOLEAN,
  },
  parser: {
    type: Sequelize.STRING,
  },
});

module.exports = Url;
