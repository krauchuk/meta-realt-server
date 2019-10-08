const express = require('express');
const { Op } = require('sequelize');
const Ad = require('../models/ad');
const Pic = require('../models/pic');

const router = express.Router();

const getQuery = (min, max) => {
  let query = {};
  if (max) {
    query = { [Op.between]: [min || 0, max] };
  } else if (min) {
    query = { [Op.gte]: min };
  }
  return query;
};

const parseRequest = (req) => {
  const data = {};
  Object.keys(req.query).forEach((key) => {
    if (key !== undefined && (key === 'regionid' || key === 'localityid'
      || key === 'iscombinedbathroom' || key === 'hasbalcony' || key === 'rooms')) {
      data[key] = req.query[key];
    }
  });

  const {
    minPrice,
    maxPrice,
    minFloor,
    maxFloor,
    minSquare,
    maxSquare,
  } = req.query;

  if (minPrice || maxPrice) {
    data.price = getQuery(minPrice, maxPrice);
  }

  if (minFloor || maxFloor) {
    data.floor = getQuery(minFloor, maxFloor);
  }

  if (minSquare || maxSquare) {
    data.square = getQuery(minSquare, maxSquare);
  }

  return data;
};

router.get('/', (req, res) => {
  const data = parseRequest(req);

  const {
    page,
  } = req.query;

  const perPage = 20;
  const offset = (page - 1) * perPage;
  const limit = page * perPage;

  Ad.findAll({
    where: data,
    include: {
      model: Pic,
      attributes: ['url'],
    },
    raw: true,
    offset,
    limit,
  })
    .then((ads) => {
      res.send(ads);
    })
    .catch(err => console.log(err));
});

router.get('/count', (req, res) => {
  const data = parseRequest(req);

  Ad.count({
    where: data,
  })
    .then((count) => {
      res.status(200).json(count);
    })
    .catch(err => console.log(err));
});

router.get('/id/:id', (req, res) => {
  const { id } = req.params;
  Ad.findOne({
    where: { id },
  })
    .then((ad) => {
      res.send(ad);
    })
    .catch(err => console.log(err));
});

router.get('/pics/:adid', (req, res) => {
  const { adid } = req.params;
  Pic.findAll({
    attributes: ['id', 'url'],
    where: { adid },
    raw: true,
  })
    .then((pics) => {
      res.send(pics);
    })
    .catch(err => console.log(err));
});

router.get('/pic/:adid', (req, res) => {
  const { adid } = req.params;
  Pic.findOne({
    attributes: ['id', 'url'],
    where: { adid },
    raw: true,
  })
    .then((pic) => {
      res.send(pic);
    })
    .catch(err => console.log(err));
});

module.exports = router;
