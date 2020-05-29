import { IProject } from '../types';
import fs from 'fs-extra';
import path from 'path';
import { getRecipeName } from '../utils';

export const remove = async (blockId: string) => {
  try {
    const project: IProject = await fs.readJson('judip.json');
    let index = -1;
    project.blocks.forEach(({ id }, i: number) => {
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
      await fs.writeFile('judip.json', JSON.stringify(project));
      console.log(`Removed block ${blockId} from ${project.name}`);
    } else {
      console.log('Block with id ' + blockId + " doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
};
