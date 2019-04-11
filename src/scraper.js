const parser = require('./parser/parser');
const options = require('./parser/parserOptions');

const urls = require('./controllers/url');
const regions = require('./controllers/region');
const localities = require('./controllers/locality');
const ads = require('./controllers/ad');

const saveNewUrls = async () => {
  for (const [optionKey, option] of options) {
    console.log('Parse Ads List');
    const adsUrls = await parser.parseAdsList(option);
    console.log('Ads List is parsed');
    for (const adUrl of adsUrls) {
      if (!await urls.getUrlByAddr(adUrl)) {
        if (urls.saveUrl(adUrl, optionKey)) {
          console.log(`Url: ${adUrl} saved`);
        }
      }
    }
  }
  console.log('All urls saved');
};

const getLocality = async (address) => {
  let localityName = null;
  let regionName = null;
  const addrArr = address.split(' ');
  if (addrArr[0] === 'г.') {
    regionName = addrArr[1].substring(0, addrArr[1].length - 1);
    localityName = addrArr[1].replace(',', '');
  } else {
    regionName = addrArr[0];
    localityName = addrArr[3].replace(',', '');
  }
  let region = await regions.getRegionByName(regionName);
  if (!region) {
    if (await regions.saveRegion(regionName)) {
      region = await regions.getRegionByName(regionName);
      console.log(`Region: ${region.name}(id: ${region.id}) saved`);
    }
  }
  let locality = await localities.getLocalityByNameAndRegion(localityName, region.id);
  if (!locality) {
    if (await localities.saveLocality(localityName, region.id)) {
      locality = await localities.getLocalityByNameAndRegion(localityName, region.id);
      console.log(`Locality: ${locality.name}(id: ${locality.id}, regionid: ${locality.regionid}) saved`);
    }
  }
  return locality;
};

const parseAndSaveAds = async () => {
  const urlArr = await urls.getNotParsedUrls();
  for (let i = 0; i < urlArr.length; i += 1) {
    console.log(`Parsing ad: ${urlArr[i].address}`);
    const url = urlArr[i];
    const option = options.get(url.optionkey).adOptions;
    const format = options.get(url.optionkey).formatOptions;
    const ad = await parser.parseAd(url.address, option);
    const address = format.address(ad.address);
    const rooms = ad.rooms ? format.rooms(ad.rooms) : null;
    const price = format.price(ad.price);
    const square = format.square(ad.square);
    const description = format.description(ad.description);
    const locality = await getLocality(address);
    if (ads.saveAd(address, price, rooms, square, description, locality.regionid, locality.id)) {
      console.log('__ad saved');
      urls.changeUrlParsedStatus(url.id);
    }
  }
  console.log('All ads saved');
};

const run = async () => {
  await saveNewUrls();
  await parseAndSaveAds();
};

module.exports = {
  run,
};
