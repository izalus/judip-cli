const uuid = require('uuid/v4');
const fs = require('fs-extra');
const path = require('path');

exports.create = async (name, dir) => {
  try {
    if (fs.existsSync('judip.json')) {
      console.log('A project already exists in this folder');
    } else {
      const id = uuid();

      const project = {
        name,
        id,
        count: 0,
        blocks: [],
      };

      await fs.writeFile(
        path.join(dir, 'judip.json'),
        JSON.stringify(project, null, 2)
      );
      await fs.mkdir(path.join(dir, 'judip_recipes'));

      console.log(
        `Successfully created project \"${name}\" at path \"${dir}\"`
      );
    }
  } catch (err) {
    console.log(err);
  }
};
