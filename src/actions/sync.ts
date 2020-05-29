import path from 'path';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
import { getAppDataPath } from '../utils';

const exec = util.promisify(child_process.exec);
const readdir = util.promisify(fs.readdir);

export const sync = async () => {
  try {
    const files = await readdir(path.join(getAppDataPath(), 'judip-cli'), {
      withFileTypes: true,
    });
    const dirNames = files
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    dirNames.forEach(async (name: string) => {
      try {
        const { stdout } = await exec('git pull', {
          cwd: path.join(getAppDataPath(), 'judip-cli', name),
        });
        console.log(name + ': ' + stdout);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
