const express = require('express');
const Region = require('../models/region');

const router = express.Router();

router.get('/', (req, res) => {
  Region.findAll({
    attributes: ['id', 'name'],
  })
    .then((regions) => {
      res.send(regions);
    })
    .catch(err => console.log(err));
});

module.exports = router;
