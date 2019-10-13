const getVerseFromRef = require('./getVerseFromRef');
const convertRefToHumanReadable = require('./convertRefToHumanReadable');

const getVersesForEach = ({ firstLesson, secondLesson, psalms }) => ({
  firstLesson: {
    verses: getVerseFromRef(firstLesson),
    ref: convertRefToHumanReadable(firstLesson),
  },
  secondLesson: {
    verses: getVerseFromRef(secondLesson),
    ref: convertRefToHumanReadable(secondLesson),
  },
  psalms: {
    verses: psalms.map(getVerseFromRef),
    ref: psalms.map(convertRefToHumanReadable),
  },
});

module.exports = ({ morning, evening }) => ({
  morning: getVersesForEach(morning),
  evening: getVersesForEach(evening),
});
