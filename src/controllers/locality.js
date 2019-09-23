const Locality = require('../models/locality');

const getLocalityByNameAndRegion = (name, regionid) => (
  Locality.findOne({
    attributes: ['id', 'name', 'regionid'],
    where: { name, regionid },
    raw: true,
  })
    .then(locality => (locality))
    .catch(err => console.log(err))
);

const saveLocality = (name, regionid) => (
  Locality.create({
    name,
    regionid,
  })
    .then(() => true)
    .catch(err => console.log(err))
);

module.exports = {
  getLocalityByNameAndRegion,
  saveLocality,
};
