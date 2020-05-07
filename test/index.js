const package = require('../package.json');
const { getAppDataPath, getRecipeName } = require('../src/utils');

console.log(package);
console.log(getAppDataPath());
console.log(getRecipeName('https://github.com/AkhileshNS/docker-node-starter'));
