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
  return db.createTable('urls', {
    id: { type: 'bigserial', primaryKey: true },
    address: 'character varying',
    parsed: 'boolean',
    parser: 'character varying',
    createdAt: 'date',
    updatedAt: 'date',
  });
};

exports.down = function(db) {
  return db.dropTable('urls');
};

exports._meta = {
  "version": 1
};
