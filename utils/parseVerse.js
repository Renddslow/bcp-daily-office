const { extractRangeFromMatch } = require('verse-reference-regex');

const books = require('./books');
const booksRegex = require('./regex');

module.exports = (ref) => {
  const regexp = new RegExp(booksRegex);
  const match = regexp.exec(ref);

  if (!match) return null;

  return Object.assign({}, extractRangeFromMatch(match, books), { ref });
};
