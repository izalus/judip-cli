import { IProject } from '../types';
import fs from 'fs-extra';
import path from 'path';
import child_process from 'child_process';
import util from 'util';
import { getRecipeName } from '../utils';
import { save } from './save';
import { clean } from './clean';

const exec = util.promisify(child_process.exec);

export const runBlock = async (
  background: boolean,
  project: IProject,
  index: number
) => {
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
      logs += stdout;
    }

    project.blocks[index].logs = logs;
  } catch (err) {
    console.log(err);
  }
};

export const run = async (block: string, background: boolean) => {
  try {
    await clean();
    await save(block);
    const project: IProject = await fs.readJson('judip.json');
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
        await runBlock(background, project, parseInt(index));
      }
    }
    await fs.writeFile('judip.json', JSON.stringify(project, null, 2));
  } catch (err) {
    console.log(err);
  }
};
