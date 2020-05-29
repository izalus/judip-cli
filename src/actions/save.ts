import fs from 'fs-extra';
import path from 'path';

const { getRecipeName } = require('../utils');

export const save = async (blockId: string) => {
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
            await fs.writeFile(path.join(recipePath, tab.path), tab.value);
            console.log(
              `Successfully wrote new value to "${tab.path}" in ${project.name}`
            );
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
