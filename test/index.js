const package = require('../package.json');
const {
  getAppDataPath,
  getRecipeName,
  type,
  isRadio,
} = require('../src/utils');
const { getInputs, getLongform } = require('../src/actions/get');
const { options } = require('./inputs-template');
const cp = require('child_process');
const fs = require('fs-extra');

// console.log(package);
// console.log(getAppDataPath());
// console.log(getRecipeName('https://github.com/AkhileshNS/docker-node-starter'));
// console.log('\n');
// console.log(type([]));

// console.log(isRadio([1, 2]));
// console.log(isRadio([1]));
// console.log(isRadio([]));
// console.log(isRadio([1, 2, 3]));
// console.log('\n');
// console.log(isRadio({ 1: '2', 2: '2' }));
// console.log(isRadio({ 1: '2' }));
// console.log(isRadio({}));
// console.log(isRadio({ 1: '2', label: 'hello' }));

// console.log(getLongform(options[0]));
// console.log(getInputs(getLongform(options[0])));
// console.log(getInputs(getLongform(options[1])));

// cp.spawn('node', ['-e', 'console.log("hello world");']).on('close', function (
//   code
// ) {
//   console.log('child exit code (spawn)', code);
// });

fs.readFile('./test/inputs-template.js', 'utf8').then((data) =>
  console.log(data)
);
