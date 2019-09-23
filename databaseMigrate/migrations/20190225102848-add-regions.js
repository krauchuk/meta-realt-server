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
  return db.createTable('regions', {
    id: { type: 'bigserial', primaryKey: true },
    name: 'character varying',
    createdAt: 'date',
    updatedAt: 'date',
  });
};

exports.down = function(db) {
  return db.dropTable('regions');
};

exports._meta = {
  "version": 1
};
