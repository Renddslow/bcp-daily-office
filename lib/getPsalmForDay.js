const path = require('path');

const { readFile } = require('../utils/fs');
const parseVerse = require('../utils/parseVerse');

const toTree = (csv) => csv
  .toString()
  .split('\n')
  .reduce((acc, line, idx) => {
    acc[idx + 1] = line.split(',').map((l) => l.trim());
    return acc;
  }, {});

const parsePsalms = (psalm) => parseVerse(`Ps ${psalm}`);

module.exports = async (day, type) => {
  const [morningCSV, eveningCSV] = await Promise.all([
    readFile(path.join(__dirname, '../psalms', `${type}.morning.bcp19.csv`)),
    readFile(path.join(__dirname, '../psalms', `${type}.evening.bcp19.csv`)),
  ]);

  const morningTree = toTree(morningCSV);
  const eveningTree = toTree(eveningCSV);

  if (type === '30') {
    // Per BCP 19:
    // If there is a 31st day of the month, psalms are chosen from among the Songs of
    // Ascents (120 to 134).
    // Day 27 seems to do this for us while only missing 132, 133, and 134
    const dayKey = day === 31 ? '27' : day.toString();

    return {
      morning: morningTree[dayKey].map(parsePsalms),
      evening: eveningTree[dayKey].map(parsePsalms),
    };
  }
};
