const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Ad = require('./ad');

const Pic = db.define('pic', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: Sequelize.STRING,
  },
});

Pic.belongsTo(Ad, {
  foreignKey: 'adid',
  targetKey: 'id',
});

module.exports = Pic;
