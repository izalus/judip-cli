const fs = require('fs-extra');
const path = require('path');
const { getRecipeName } = require('../utils');

exports.remove = async (blockId) => {
  try {
    const project = await fs.readJson('judip.json');
    let index = -1;
    project.blocks.forEach(({ id }, i) => {
      if (blockId === id.toString()) {
        index = i;
      }
    });
    if (index != -1) {
      await fs.remove(
        path.join(
          'judip_recipes',
          `${project.id}_${getRecipeName(project.blocks[index].recipe)}_${
            project.blocks[index].id
          }`
        )
      );
      project.blocks.splice(index, 1);
      await fs.writeJson('judip.json', project);
      console.log(`Removed block ${blockId} from ${project.name}`);
    } else {
      console.log('Block with id ' + blockId + " doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
};
