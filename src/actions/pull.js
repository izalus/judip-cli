const util = require('util');
const path = require('path');
const fs = require('fs-extra');
const child_process = require('child_process');
const { getAppDataPath, getRecipeName } = require('../utils');
const package = require('../../package.json');

const exec = util.promisify(child_process.exec);

exports.pull = async (recipe) => {
  try {
    if (!fs.existsSync(path.join(getAppDataPath(), package.name))) {
      await fs.mkdir(path.join(getAppDataPath(), package.name));
    }

    if (
      !fs.existsSync(
        path.join(getAppDataPath(), package.name, getRecipeName(recipe))
      )
    ) {
      await exec(`git clone ${recipe} ${getRecipeName(recipe)}`, {
        cwd: path.join(getAppDataPath(), package.name),
      });
      console.log(`Successfully pulled recipe from ${recipe}`);
    } else {
      console.log(`${recipe} has already been pulled`);
    }
  } catch (err) {
    console.log(err);
  }
};
