const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');
const util = require('util');
const { getRecipeName } = require('../utils');
const { save } = require('./save');
const { clean } = require('./clean');

const exec = util.promisify(child_process.exec);

const runBlock = async (background, project, index) => {
  try {
    const blockname = `${project.id}_${getRecipeName(
      project.blocks[index].recipe
    )}_${project.blocks[index].id}`;
    const recipe = await fs.readJson(
      path.join('judip_recipes', blockname, 'recipe.json')
    );
    let commands = recipe.execute;
    if (background) {
      commands = recipe.execute_background;
    }

    let logs = '';

    for (let i in commands) {
      const { stdout } = await exec(commands[i], {
        cwd: path.join('judip_recipes', blockname),
      });

      console.log(stdout);
      if (i == commands.length - 1) {
        logs += stdout;
      }
    }

    project.blocks[index].logs = logs;
  } catch (err) {
    console.log(err);
  }
};

exports.run = async (block, background) => {
  try {
    await clean();
    await save(block);
    const project = await fs.readJson('judip.json');
    if (block) {
      let index = -1;
      project.blocks.forEach(({ id }, i) => {
        if (block === id.toString()) {
          index = i;
        }
      });

      if (index != -1) {
        await runBlock(background, project, index);
      } else {
        console.log('Error: Unable to find block with index ' + block);
      }
    } else {
      for (let index in project.blocks) {
        await runBlock(background, project, index);
      }
    }
    await fs.writeJson('judip.json', project);
  } catch (err) {
    console.log(err);
  }
};
