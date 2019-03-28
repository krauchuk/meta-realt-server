const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Region = db.define('region', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Region;
