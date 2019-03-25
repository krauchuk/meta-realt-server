const { Pool } = require('pg');
const adsQueryBuilder = require('./adsQueryBuilder');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'meta-realt',
  password: 'root',
  port: 5432,
});

const getAds = (req, res) => {
  const query = adsQueryBuilder.build(req);
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const saveAd = (address, price, rooms, square, regionid, localityid) => {
  const query = `insert into ads (address, price, rooms, square, regionid, localityid)
   values ('${address}', ${price}, ${rooms}, '${square}', ${regionid}, ${localityid})`;
  return pool.query(query)
    .then(() => true)
    .catch(() => false);
};

const getRegions = (req, res) => {
  const query = 'select * from regions';
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getRegionByName = (name) => {
  const query = `select * from regions where name like '${name}%'`;
  return pool.query(query).then(res => (res.rows[0]));
};

const saveRegion = (name) => {
  const query = `insert into regions (name) values ('${name}')`;
  return pool.query(query)
    .then(() => true)
    .catch(() => false);
};

const getLocalities = (req, res) => {
  const query = 'select * from localities';
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getLocalityByNameAndRegion = (name, regionid) => {
  const query = `select * from localities where name = '${name}' and regionid = ${regionid}`;
  return pool.query(query).then(res => (res.rows[0]));
};

const saveLocality = (name, regionid) => {
  const query = `insert into localities (name, regionid) VALUES ('${name}', '${regionid}')`;
  return pool.query(query)
    .then(() => true)
    .catch(() => false);
};

const getUrlByUrl = (url) => {
  const query = `select * from urls where url = '${url}'`;
  return pool.query(query).then(res => (res.rows[0]));
};

const getNotParsedUrls = () => {
  const query = 'select id, url, optionKey from urls where parsed = false';
  return pool.query(query).then(res => (res.rows));
};

const saveUrl = (url, optionKey) => {
  const query = `insert into urls (url, parsed, optionkey) VALUES ('${url}', false, '${optionKey}')`;
  return pool.query(query)
    .then(() => true)
    .catch(() => false);
};

const changeUrlParsedStatus = (id) => {
  const query = `update urls set parsed = true where id = ${id}`;
  pool.query(query);
};

module.exports = {
  getAds,
  getRegions,
  getLocalities,
  getUrlByUrl,
  getNotParsedUrls,
  saveUrl,
  changeUrlParsedStatus,
  saveAd,
  getRegionByName,
  getLocalityByNameAndRegion,
  saveLocality,
  saveRegion,
};
