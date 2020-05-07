const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const child_process = require('child_process');

const { getAppDataPath } = require('../utils');

const exec = util.promisify(child_process.exec);

exports.sync = async () => {
  try {
    const files = await fs.readdir(path.join(getAppDataPath(), 'judip-cli'), {
      withFileTypes: true,
    });
    const dirNames = files
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    dirNames.forEach(async (name) => {
      try {
        const { stdout } = await exec('git pull', {
          cwd: path.join(getAppDataPath(), 'judip-cli', name),
        });
        console.log(name + ': ' + stdout);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
