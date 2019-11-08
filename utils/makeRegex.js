const path = require('path');
const { createRegex } = require('verse-reference-regex');

const { writeFile } = require('./fs');
const books = require('./books');

(async () => {
  const booksRegex = createRegex({ books });

  const template = `module.exports = ${booksRegex};`;
  await writeFile(path.join(__dirname, './regex.js'), template);
})();
