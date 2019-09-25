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
    price: 'bigint',
    rooms: 'smallint',
    floor: 'smallint',
    square: 'real',
    description: 'character varying',
    iscombinedbathroom: 'boolean',
    hasbalcony: 'boolean',
    regionid: 'bigint',
    localityid: 'bigint',
    picid: 'bigint',
    createdAt: 'date',
    updatedAt: 'date',
  });
};

exports.down = function(db) {
  return db.dropTable('ads');
};

exports._meta = {
  "version": 1
};
