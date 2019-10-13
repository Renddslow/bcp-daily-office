const path = require('path');

const { readFile } = require('../utils/fs');

const PROPER_MAP = {
  'sunday': 'Easter Sunday',
  'saturday': 'Holy Saturday',
  'friday': 'Good Friday',
  'thursday': 'Maundy Thursday',
  'ascension': 'Ascension Sunday',
  'pentecost': 'Pentecost',
  'ash-wednesday': 'Ash Wednesday',
};

const getSpecialDayName = async (today) => {
  const day = today.split('-').slice(1).join('-');
  const days = JSON.parse((await readFile(path.join(__dirname, '../holy-days/red-letter.json'))).toString());
  return days[day];
};

module.exports = async (today, proper) => {
  const specialDay = proper ? PROPER_MAP[proper] : await getSpecialDayName(today);
  return {
    today,
    specialDay,
  };
};
