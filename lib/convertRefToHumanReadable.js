const createRange = (start, end) => {
  if (!start && !end) {
    return '';
  } else if (start && !end) {
    return start;
  }

  return `${start}-${end}`;
};

module.exports = ({ book, start, end }) => {
  if (start.chapter === end.chapter) {
    const verseRange = createRange(start.verse, end.verse);
    return verseRange ? `${book} ${start.chapter}:${verseRange}` : `${book} ${start.chapter}`;
  } else {
    const startRef = `${start.chapter}:${start.verse}`;
    const endRef = `${end.chapter}:${end.verse}`;
    return `${book} ${createRange(startRef, endRef)}`;
  }
};
