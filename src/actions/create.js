const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

exports.create = async (name, dir) => {
  try {
    const id = uuid();

    const project = {
      name,
      id,
      blocks: [],
    };

    await writeFile(
      path.join(dir, name + '.judip.json'),
      JSON.stringify(project)
    );
    await mkdir(path.join(dir, 'judip_recipes'));
  } catch (err) {
    console.log(err);
  }
};
