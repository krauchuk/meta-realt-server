const express = require('express');
const Locality = require('../models/locality');

const router = express.Router();

router.get('/', (req, res) => {
  Locality.findAll()
    .then((localities) => {
      res.send(localities);
    })
    .catch(err => console.log(err));
});

module.exports = router;
