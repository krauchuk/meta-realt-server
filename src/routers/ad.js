const express = require('express');
const Ad = require('../models/ad');

const router = express.Router();

router.get('/', (req, res) => {
  Ad.findAll()
    .then((ads) => {
      res.send(ads);
    })
    .catch(err => console.log(err));
});

module.exports = router;
