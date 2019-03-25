/* eslint-disable */
'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('ads', {
    id: { type: 'bigserial', primaryKey: true },
    address: 'character varying',
    price: 'character varying',
    rooms: 'smallint',
    square: 'character varying',
    regionid: 'bigint',
    localityid: 'bigint',
  });
};

exports.down = function(db) {
  return db.dropTable('ads');
};

exports._meta = {
  "version": 1
};
