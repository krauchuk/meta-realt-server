const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Region = require('./region');
const Locality = require('./locality');
const Pic = require('./pic');

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
    type: Sequelize.BIGINT,
  },
  rooms: {
    type: Sequelize.SMALLINT,
  },
  floor: {
    type: Sequelize.SMALLINT,
  },
  square: {
    type: Sequelize.REAL,
  },
  description: {
    type: Sequelize.STRING,
  },
  iscombinedbathroom: {
    type: Sequelize.BOOLEAN,
  },
  hasbalcony: {
    type: Sequelize.BOOLEAN,
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

Ad.belongsTo(Pic, {
  foreignKey: 'picid',
  targetKey: 'id',
});

module.exports = Ad;
