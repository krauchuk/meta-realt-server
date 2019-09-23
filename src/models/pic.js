const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Pic = db.define('pic', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: Sequelize.STRING,
  },
  adid: {
    type: Sequelize.BIGINT,
  },
});

module.exports = Pic;
