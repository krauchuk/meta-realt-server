const express = require('express');
const Ad = require('../models/ad');

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

module.exports = router;
