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

module.exports = [...canon, ...deuterocanon];
