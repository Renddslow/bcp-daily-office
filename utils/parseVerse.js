const { createRegex, extractRangeFromMatch } = require('verse-reference-regex');
const canon = require('books-of-the-bible');

const deuterocanon = [
  {
    name: '1 Maccabees',
    aliases: ['1 Macc']
  },
  {
    name: '2 Maccabees',
    aliases: ['2 Macc']
  },
  {
    name: 'Ecclesiasticus',
    aliases: []
  },
  {
    name: 'Wisdom of Solomon',
    aliases: ['Wisdom']
  },
  {
    name: 'Susanna',
    aliases: []
  },
  {
    name: 'Baruch',
    aliases: []
  },
  {
    name: 'Judith',
    aliases: []
  }
];

const books = [...canon, ...deuterocanon];
const booksRegex = createRegex({ books });

module.exports = (ref) => {
  const regexp = new RegExp(booksRegex);
  const match = regexp.exec(ref);

  if (!match) return null;

  return Object.assign({}, extractRangeFromMatch(match, books), { ref });
};
