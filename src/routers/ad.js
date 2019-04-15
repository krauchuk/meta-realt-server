const express = require('express');
const Ad = require('../models/ad');
const Pic = require('../models/pic');

const router = express.Router();

router.get('/', (req, res) => {
  const data = {};

  Object.keys(req.query).forEach((key) => {
    if (key !== undefined && key !== 'page') {
      data[key] = req.query[key];
    }
  });

  const { page } = req.query;
  const perPage = 20;
  const offset = (page - 1) * perPage;
  const limit = page * perPage;

  Ad.findAll({
    where: data,
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
  const data = req.query;
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
