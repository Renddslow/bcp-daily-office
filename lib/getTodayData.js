const path = require('path');

const { readFile } = require('../utils/fs');
const getLine = require('../utils/getLine');

const convertMovableDatesToObj = require('./convertMovableDatesToObj');
const convertProperToVerseObj = require('./convertProperToVerseObj');
const convertLineToVerseObj = require('./convertLineToVerseObj');
const getPsalmForDay = require('./getPsalmForDay');
const getMeta = require('./getMeta');

const BCP19_SUFFIX = `bcp19.csv`;

const HOLY_WEEK = [
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

module.exports = async (today, params = {}) => {
  const [year, month, day] = today.split('-');
  const tablesFP = path.join(__dirname, '../tables');

  const [easterTable, movableDatesTable] = await Promise.all([
    readFile(path.join(tablesFP, 'easter.csv')),
    readFile(path.join(tablesFP, 'movable-dates.csv')),
  ]);

  const [, easterDate] = getLine(easterTable, year);
  const movableDates = convertMovableDatesToObj(getLine(movableDatesTable, easterDate), year);

  const needsProper = movableDates[today];

  // If the day requires a proper lesson, we return that day's assigned
  // readings, otherwise, we return the readings for the day
  if (needsProper) {
    const propersFP = path.join(__dirname, '../holy-days');

    const isHolyWeek = HOLY_WEEK.includes(needsProper);

    const properFilename = isHolyWeek ?
      `holy-week.bcp19.json` :
      `${needsProper}.bcp19.json`;

    const holyDayJSON = JSON.parse((await readFile(path.join(propersFP, properFilename))).toString());
    const assignments = isHolyWeek ? holyDayJSON[needsProper] : holyDayJSON;
    const verses = convertProperToVerseObj(assignments);
    return {
      attributes: verses,
      meta: await getMeta(today, needsProper),
    };
  }

  const morningFilename = `${month}.morning.${BCP19_SUFFIX}`;
  const eveningFilename = `${month}.evening.${BCP19_SUFFIX}`;

  const lessonsFP = path.join(__dirname, '../lessons');
  const [morningCSV, eveningCSV] = await Promise.all([
    readFile(path.join(lessonsFP, morningFilename)),
    readFile(path.join(lessonsFP, eveningFilename)),
  ]);

  const date = parseInt(day, 10);
  const morning = convertLineToVerseObj(getLine(morningCSV, date));
  const evening = convertLineToVerseObj(getLine(eveningCSV, date));

  const psalms = await getPsalmForDay(date, params.psalm_cycle || '30');

  morning.psalms = psalms.morning;
  evening.psalms = psalms.evening;

  return {
    attributes: {
      morning,
      evening,
    },
    meta: await getMeta(today),
  }
};
