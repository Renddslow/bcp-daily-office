const parseVerse = require('../utils/parseVerse');

module.exports = (line) => {
  const [, firstLesson, secondLesson] = line;
  return {
    firstLesson: parseVerse(firstLesson),
    secondLesson: parseVerse(secondLesson),
  };
};
