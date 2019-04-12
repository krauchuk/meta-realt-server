const osmosis = require('osmosis');

const parseAd = (url, options) => {
  const promise = new Promise((resolve) => {
    osmosis
      .get(url)
      .set({
        address: options.address,
        price: options.price,
        rooms: options.rooms,
        square: options.square,
        description: options.description,
      })
      .data(data => resolve(data));
  });
  return promise;
};

const parseAdsList = (options) => {
  const promise = new Promise((resolve) => {
    const adsUrl = [];
    osmosis
      .get(options.adsListUrl)
      .paginate(options.nextPageBtn).delay(500)
      .find(options.adUrlBlock)
      .set({
        adUrl: options.adUrl,
      })
      .data((data) => {
        adsUrl.push(data.adUrl);
      })
      .done(() => resolve(adsUrl))
      .log(console.log);
  });
  return promise;
};

const parsePicsList = (url, options) => {
  const promise = new Promise((resolve) => {
    const pics = [];
    osmosis
      .get(url)
      .find(options.picBlock)
      .set({
        picUrl: options.pic,
      })
      .data((data) => {
        pics.push(data.picUrl);
      })
      .done(() => resolve(pics))
      .log(console.log);
  });
  return promise;
};

module.exports = {
  parseAd,
  parseAdsList,
  parsePicsList,
};
