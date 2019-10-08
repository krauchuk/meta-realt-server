const axios = require('axios');

const parserName = 'kufar.by';

const adsListUrl = 'https://re.kufar.by/api/search/ads-search/v1/engine/'
  + 'v1/search/raw-paginated?cat=1010&cur=BYR&size=30&sort=lst.d&typ=sell';

const getParserName = () => (
  parserName
);

const getAdApiUrl = (adUrl) => {
  const urlParts = adUrl.split('/');
  const adId = urlParts[urlParts.length - 1];
  return `https://re.kufar.by/api/search/ads-search/v1/engine/v1/view/${adId}/rendered?lang=ru`;
};

const findValue = (data, arrName, compareParam, reqParam, value) => {
  const arrObj = data[arrName].filter(obj => (obj[compareParam] === reqParam));
  return arrObj.length !== 0 ? arrObj[0][value] : null;
};

const getAdData = (adUrl) => {
  const apiUrl = getAdApiUrl(adUrl);
  return axios.get(apiUrl, {
    headers: {
      'x-segmentation': 'routing=web_re;platform=web;application=ad_view',
    },
  })
    .then((response) => {
      const data = response.data.result;
      const arrName = 'ad_parameters';
      return {
        address: findValue(data, 'account_parameters', 'p', 'address', 'v'),
        rooms: findValue(data, arrName, 'p', 'rooms', 'vl')
          ? Number.parseInt(findValue(data, arrName, 'p', 'rooms', 'vl'), 10) : null,
        price: data.price_byn ? Number.parseInt(data.price_byn, 10) : null,
        floor: findValue(data, arrName, 'p', 'floor', 'v')
          ? findValue(data, arrName, 'p', 'floor', 'v')[0] : null,
        square: findValue(data, arrName, 'p', 'size', 'v')
          ? findValue(data, arrName, 'p', 'size', 'v') : null,
        description: data.body ? data.body.replace(/\n/g, '') : null,
        combinedbathroom: findValue(data, arrName, 'p', 'bathroom', 'v')
          ? (findValue(data, arrName, 'p', 'bathroom', 'v') === '0') : null,
        hasbalcony: findValue(data, arrName, 'p', 'balcony', 'v')
          ? (findValue(data, arrName, 'p', 'balcony', 'v') === '1') : null,
        regionName: findValue(data, arrName, 'p', 'region', 'vl'),
        localityName: findValue(data, arrName, 'p', 'area', 'vl'),
      };
    })
    .catch(e => console.log(e));
};

const getPicsUrlArr = (adUrl) => {
  const apiUrl = getAdApiUrl(adUrl);
  return axios.get(apiUrl)
    .then((response) => {
      const picsArr = [];
      const picsIdArr = response.data.result.images;
      picsIdArr.forEach((pic) => {
        const picServ = pic.id.substring(0, 2);
        picsArr.push(`https://content.kufar.by/gallery/${picServ}/${pic.id}.jpg`);
      });
      return picsArr;
    })
    .catch(e => console.log(e));
};

const getNextAdsPageUrl = async adsUrl => (
  axios.get(adsUrl)
    .then((response) => {
      const { pagination } = response.data;
      const nextPageToken = findValue(pagination, 'pages', 'label', 'next', 'token');
      if (nextPageToken) {
        return `${adsListUrl}&cursor=${nextPageToken}`;
      }
      return null;
    })
    .catch(e => console.log(e))
);

const getPageAdsUrls = async (adsUrl) => {
  console.log(`parsing page ${adsUrl}`);
  const adsUrlArr = [];
  await axios.get(adsUrl)
    .then((response) => {
      const adsArr = response.data.ads;
      adsArr.forEach((ad) => {
        adsUrlArr.push(ad.ad_link);
      });
    })
    .catch(e => console.log(e));
  return adsUrlArr;
};

const getAdsUrlArr = async () => {
  let adsUrlArr = await getPageAdsUrls(adsListUrl);
  let nextPageUrl = await getNextAdsPageUrl(adsListUrl);
  while (nextPageUrl) {
    adsUrlArr = [...adsUrlArr, ...await getPageAdsUrls(nextPageUrl)];
    nextPageUrl = await getNextAdsPageUrl(nextPageUrl);
  }
  return adsUrlArr;
};

module.exports = {
  getParserName,
  getAdData,
  getPicsUrlArr,
  getAdsUrlArr,
};
