const child_process = require('child_process');
const util = require('util');

const exec = util.promisify(child_process.exec);

exports.clean = async () => {
  try {
    await exec('docker container prune -f');
    console.log('Cleaned any dangling containers');
  } catch (err) {
    console.log(err);
  }
};
