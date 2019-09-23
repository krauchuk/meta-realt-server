const Url = require('../models/url');

const getUrlByAddr = address => (
  Url.findOne({
    attributes: ['id', 'address', 'parsed', 'parser'],
    where: { address },
  })
    .then(url => (url))
    .catch(err => console.log(err))
);

const getNotParsedUrls = parser => (
  Url.findAll({
    attributes: ['id', 'address', 'parsed', 'parser'],
    where: {
      parsed: false,
      parser,
    },
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

const saveUrl = (address, parser) => (
  Url.create({
    address,
    parsed: false,
    parser,
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
