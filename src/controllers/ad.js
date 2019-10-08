const Ad = require('../models/ad');

const saveAd = (address, price, rooms, floor, square, description,
  iscombinedbathroom, hasbalcony, regionid, localityid) => (
  Ad.create({
    address,
    price,
    rooms,
    floor,
    square,
    description,
    iscombinedbathroom,
    hasbalcony,
    regionid,
    localityid,
  })
    .then(ad => (ad.id))
    .catch(err => console.log(err))
);

const addPicId = (id, picid) => (
  Ad.update({
    picid,
  },
  {
    where: { id },
  })
    .then(() => true)
    .catch(err => console.log(err))
);

module.exports = {
  saveAd,
  addPicId,
};
