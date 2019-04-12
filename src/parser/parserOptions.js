const hataByOptions = {
  adsListUrl: 'https://www.hata.by/sale-flat/list/',
  adUrlBlock: '.b-object-tabs__main-img',
  adUrl: '@href',
  nextPageBtn: '.b-pagination__item_nav',
  adOptions: {
    address: '.b-card__address',
    price: '.value',
    rooms: '.i-table tr + tr .value',
    square: '.b-card__product .num',
    description: '.b-card__article .description',
    picBlock: '.fotorama-main a',
    pic: '@href',
  },
  formatOptions: {
    address: (str) => {
      const addrArr = str.split(' ');
      let result = '';
      for (let i = 0; i < addrArr.length - 1; i += 1) {
        if (!(addrArr[i + 1] === 'р-н' || addrArr[i] === 'р-н')) {
          result += addrArr[i] === 'обл.' ? `${addrArr[i]}, ` : `${addrArr[i]} `;
        }
      }
      result += addrArr[addrArr.length - 1];
      return result;
    },
    rooms: (str) => {
      const result = str.split(' ')[0];
      return result > 8 ? 0 : result;
    },
    price: (str) => {
      const addrArr = str.split(' ');
      let result = '';
      for (let i = 0; i < addrArr.length; i += 1) {
        if (addrArr[i] === '$') break;
        result += addrArr[i];
      }
      return result;
    },
    square: str => (str.split(' ')[0]),
    description: str => str,
    pic: str => (str.split('&image=')[1]),
  },
};

const optionsArray = new Map([
  ['hata.by', hataByOptions],
]);

module.exports = optionsArray;
