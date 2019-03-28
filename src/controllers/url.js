const Url = require('../models/url');

const getUrlByAddr = address => (
  Url.findOne({
    attributes: ['id', 'address', 'parsed', 'optionkey'],
    where: { address },
  })
    .then(url => (url))
    .catch(err => console.log(err))
);

const getNotParsedUrls = () => (
  Url.findAll({
    attributes: ['id', 'address', 'parsed', 'optionkey'],
    where: { parsed: false },
    raw: true,
  })
    .then(urls => (urls))
    .catch(err => console.log(err))
);

const changeUrlParsedStatus = id => (
  Url.update({
    parsed: true,
  },
  {
    where: {
      id,
    },
  })
    .then(() => true)
    .catch(err => console.log(err))
);

const saveUrl = (address, optionkey) => (
  Url.create({
    address,
    parsed: false,
    optionkey,
  })
    .then(() => true)
    .catch(err => console.log(err))
);

module.exports = {
  getUrlByAddr,
  getNotParsedUrls,
  changeUrlParsedStatus,
  saveUrl,
};
