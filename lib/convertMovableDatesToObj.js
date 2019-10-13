const moment = require('moment');

module.exports = (movableDates, year) => {
  const makeDateWithYear = (date) => moment(`${date} ${year}`, 'MMM D YYYY').format('YYYY-MM-DD');
  const getHolyWeekDay = (easter, sub) => moment(`${easter} ${year}`, 'MMM D YYYY')
    .subtract(sub, 'd').format('YYYY-MM-DD');
  const [easter,, ashWednesday, ascension, pentecost] = movableDates;

  const maundyThursday = getHolyWeekDay(easter, 3);
  const goodFriday = getHolyWeekDay(easter, 2);
  const holySaturday = getHolyWeekDay(easter, 1);

  return {
    [maundyThursday]: 'thursday',
    [goodFriday]: 'friday',
    [holySaturday]: 'saturday',
    [makeDateWithYear(easter)]: 'sunday',
    [makeDateWithYear(ashWednesday)]: 'ash-wednesday',
    [makeDateWithYear(ascension)]: 'ascension',
    [makeDateWithYear(pentecost)]: 'pentecost',
  };
};
