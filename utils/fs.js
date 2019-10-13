const { promisify } = require('util');
const fs = require('fs');

module.exports.readFile = promisify(fs.readFile);
module.exports.writeFile = promisify(fs.writeFile);
