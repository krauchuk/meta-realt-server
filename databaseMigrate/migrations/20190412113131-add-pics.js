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
  return db.createTable('pics', {
    id: { type: 'bigserial', primaryKey: true },
    url: 'character varying',
    adid: 'bigint',
    createdAt: 'date',
    updatedAt: 'date',
  });
};

exports.down = function(db) {
  return db.dropTable('pics');
};

exports._meta = {
  "version": 1
};
