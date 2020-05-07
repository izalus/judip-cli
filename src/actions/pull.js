const util = require('util');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const { getAppDataPath, getRecipeName } = require('../utils');
const package = require('../../package.json');

const mkdir = util.promisify(fs.mkdir);
const exec = util.promisify(child_process.exec);

exports.pull = async (recipe) => {
  try {
    if (!fs.existsSync(path.join(getAppDataPath(), package.name))) {
      await mkdir(path.join(getAppDataPath(), package.name));
    }

    await exec(`git clone ${recipe} ${getRecipeName(recipe)}`, {
      cwd: path.join(getAppDataPath(), package.name),
    });
    console.log(`Successfully pulled recipe from ${recipe}`);
  } catch (err) {
    console.log(err);
  }
};
