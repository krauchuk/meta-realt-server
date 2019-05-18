const kufarBy = require('./kufarBy');

const parsersArray = new Map([
  [kufarBy.getParserName(), kufarBy],
]);

module.exports = parsersArray;
