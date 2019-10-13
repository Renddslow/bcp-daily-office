const moment = require('moment');
const path = require('path');

const { readFile } = require('../utils/fs');
const getLine = require('../utils/getLine');

module.exports = async (today, type) => {
  const regexp = /"(.*)"/g;
  const day = moment(today, 'YYYY-MM-DD').format('dddd').toLowerCase();
  const [, title, ...contentRaw] = getLine(await readFile(path.join(__dirname, '../collects', `${type}.csv`)), day);
  const [, content] = regexp.exec(contentRaw.join(' '));
  return {
    title,
    content,
  };
};
