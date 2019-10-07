const { createRegex, extractRangeFromMatch, createChapterVerseRangeRegex } = require('verse-reference-regex');

module.exports = (ref) => {
  const regexp = createRegex();
  const match = regexp.exec(ref);

  if (!match) return null;

  return extractRangeFromMatch(match);
};
