import util from 'util';
import path from 'path';
import fs from 'fs-extra';
import child_process from 'child_process';
import { getAppDataPath, getRecipeName } from '../utils';
import Package from '../../package.json';

const exec = util.promisify(child_process.exec);

export const pull = async (recipe: string) => {
  try {
    if (!fs.existsSync(path.join(getAppDataPath(), Package.name))) {
      await fs.mkdir(path.join(getAppDataPath(), Package.name));
    }

    if (
      !fs.existsSync(
        path.join(getAppDataPath(), Package.name, getRecipeName(recipe))
      )
    ) {
      await exec(`git clone ${recipe} ${getRecipeName(recipe)}`, {
        cwd: path.join(getAppDataPath(), Package.name),
      });
      console.log(`Successfully pulled recipe from ${recipe}`);
    } else {
      console.log(`${recipe} has already been pulled`);
    }
  } catch (err) {
    console.log(err);
  }
};
