const util = require('util');
const path = require('path');
const fs = require('fs');
const Git = require('nodegit');
const { getAppDataPath, getRecipeName } = require('../utils');

const mkdir = util.promisify(fs.mkdir);

exports.pull = async (recipe) => {
  try {
    if (!fs.existsSync(path.join(getAppDataPath(), 'judip-cli'))) {
      await mkdir(path.join(getAppDataPath(), 'judip-cli'));
    }

    if (
      !fs.existsSync(
        path.join(getAppDataPath(), 'judip-cli/' + getRecipeName(recipe))
      )
    ) {
      await mkdir(
        path.join(getAppDataPath(), 'judip-cli/' + getRecipeName(recipe))
      );
    }

    await Git.Clone(
      recipe,
      path.join(getAppDataPath(), 'judip-cli/' + getRecipeName(recipe))
    );
  } catch (err) {
    console.log(err);
  }
};
