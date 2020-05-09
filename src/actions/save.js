const fs = require('fs-extra');
const path = require('path');

const { getRecipeName } = require('../utils');

exports.save = async (blockId) => {
  try {
    const project = await fs.readJson('judip.json');

    for (let block of project.blocks) {
      if (!blockId || block.id.toString() === blockId) {
        const recipePath = path.join(
          'judip_recipes',
          `${project.id}_${getRecipeName(block.recipe)}_${block.id}`
        );
        for (let tab of block.tabs) {
          if (tab.type === 'code') {
            await fs.writeFile(path.join(recipePath, tab.name), tab.value);
            console.log(
              `Successfully wrote new value to "${tab.name}" in ${project.name}`
            );
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
