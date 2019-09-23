const Pic = require('../models/pic');

const saveAdPics = (url, adid) => (
  Pic.create({
    url,
    adid,
  })
    .then(pic => pic.id)
    .catch(err => console.log(err))
);

const getAdPics = adid => (
  Pic.findAll({
    attributes: ['id', 'url'],
    where: { adid },
    raw: true,
  })
    .then(pics => (pics))
    .catch(err => console.log(err))
);

module.exports = {
  saveAdPics,
  getAdPics,
};
