const getBook = (book) => {
  try {
    return require(`world-english-bible/json/${book}.json`);
  } catch (e) {
    return null;
  }
};

const findRef = ({ chapter, verse }) => ({ chapterNumber, verseNumber }) => {
  if (!verse) {
    return chapterNumber === chapter;
  }
  return chapterNumber === chapter && verse === verseNumber;
};

module.exports = (ref) => {
  const webBookKey = ref.book.replace(/\s/g, '').toLowerCase();
  const book = {
    content: getBook(webBookKey)
  };

  if (!book.content) return null;

  const refStart = book.content.findIndex(findRef(ref.start));
  book.content = book.content.slice(refStart).reverse();
  const refEnd = book.content.findIndex(findRef(ref.end));
  book.content = book.content.slice(refEnd).reverse();

  return book.content;
};
