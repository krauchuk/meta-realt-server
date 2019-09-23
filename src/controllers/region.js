const Region = require('../models/region');

const getRegionByName = name => (
  Region.findOne({
    attributes: ['id', 'name'],
    where: { name },
    raw: true,
  })
    .then(region => (region))
    .catch(err => console.log(err))
);

const saveRegion = name => (
  Region.create({
    name,
  })
    .then(() => true)
    .catch(err => console.log(err))
);

module.exports = {
  getRegionByName,
  saveRegion,
};
