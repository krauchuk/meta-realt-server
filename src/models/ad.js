const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Region = require('./region');
const Locality = require('./locality');

const Ad = db.define('ad', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  },
  rooms: {
    type: Sequelize.SMALLINT,
  },
  square: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

Ad.belongsTo(Region, {
  foreignKey: 'regionid',
  targetKey: 'id',
});

Ad.belongsTo(Locality, {
  foreignKey: 'localityid',
  targetKey: 'id',
});

module.exports = Ad;
