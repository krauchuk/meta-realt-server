const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Region = require('./region');

const Locality = db.define('locality', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

Locality.belongsTo(Region, {
  foreignKey: 'regionid',
  targetKey: 'id',
});

module.exports = Locality;
