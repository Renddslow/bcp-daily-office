const parseVerse = require('../utils/parseVerse');

const parseSection = ({ psalms, firstLesson, secondLesson }) => ({
  psalms: psalms.map((p) => parseVerse(`Ps ${p}`)),
  firstLesson: parseVerse(firstLesson),
  secondLesson: parseVerse(secondLesson),
});

module.exports = ({ morning, evening }) => ({
  morning: parseSection(morning),
  evening: parseSection(evening),
});
