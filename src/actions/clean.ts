import child_process from 'child_process';
import util from 'util';

const exec = util.promisify(child_process.exec);

export const clean = async () => {
  try {
    await exec('docker container prune -f');
    console.log('Cleaned any dangling containers');
  } catch (err) {
    console.log(err);
  }
};
