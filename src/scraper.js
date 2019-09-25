const parsers = require('./parsers');

const urls = require('./controllers/url');
const regions = require('./controllers/region');
const localities = require('./controllers/locality');
const ads = require('./controllers/ad');
const pics = require('./controllers/pic');

const saveNewUrls = async () => {
  for (const [parserName, parser] of parsers) {
    console.log(`Parse Ads List; parser: ${parserName}`);
    const adsUrls = await parser.getAdsUrlArr();
    console.log('Ads List is parsed');
    for (const adUrl of adsUrls) {
      if (!await urls.getUrlByAddr(adUrl)) {
        if (urls.saveUrl(adUrl, parserName)) {
          console.log(`Url: ${adUrl} saved`);
        }
      }
    }
    console.log('All urls saved');
  }
};

const getLocality = async (regionName, localityName) => {
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
  for (const [parserName, parser] of parsers) {
    const urlArr = await urls.getNotParsedUrls(parserName);
    for (const url of urlArr) {
      console.log(`Parsing ad: ${url.address}`);
      const ad = await parser.getAdData(url.address);
      const {
        address,
        rooms,
        price,
        floor,
        square,
        description,
        combinedbathroom,
        hasbalcony,
        regionName,
        localityName,
      } = ad;
      const locality = await getLocality(regionName, localityName);
      const adId = await ads.saveAd(address, price, rooms, floor, square,
        description, combinedbathroom, hasbalcony, locality.regionid, locality.id);
      let adMainPic = null;
      if (adId) {
        urls.changeUrlParsedStatus(url.id);
        const picsArr = await parser.getPicsUrlArr(url.address);
        for (let j = 0; j < picsArr.length; j += 1) {
          if (j === 0) {
            adMainPic = await pics.saveAdPics(picsArr[j], adId);
          }
          pics.saveAdPics(picsArr[j], adId);
        }
      }
      ads.addPicId(adId, adMainPic);
      console.log('__ad saved');
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
