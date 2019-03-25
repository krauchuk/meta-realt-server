const build = (req) => {
  const paramArray = [
    req.query.adid,
    req.query.rooms,
    req.query.regionid,
    req.query.localityid,
  ];
  const queryArray = [
    'id = ',
    'rooms = ',
    'regionid = ',
    'localityid = ',
  ];

  const page = req.query.page;
  let query = 'select ';
  if (!req.query.count) {
    query += '* from ads ';
  } else {
    query += 'count(*) from ads ';
  }
  let isFirstParam = true;

  paramArray.forEach((param, index) => {
    if (param) {
      if (isFirstParam) {
        query += 'where ';
        isFirstParam = false;
      } else {
        query += 'and ';
      }
      query += `${queryArray[index]} ${param} `;
    }
  });

  if (page) {
    const perPage = 20;
    const firstIndex = (page - 1) * perPage;
    const lastIndex = page * perPage;
    query += `offset ${firstIndex} limit ${lastIndex}`;
  }

  return query;
};

module.exports = {
  build,
};
