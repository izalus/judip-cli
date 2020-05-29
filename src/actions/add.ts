import path from 'path';
import fs from 'fs-extra';
import child_process from 'child_process';
import hbs from 'handlebars';
import { getRecipeName, getAppDataPath } from '../utils';
import Package from '../../package.json';
import { ICodeBlock } from '../types';

export const add = async (
  recipeUrl: string,
  build: boolean,
  outputs: string
) => {
  try {
    const project = await fs.readJson('judip.json');
    project.count = project.count + 1;
    const blockname = `${project.id}_${getRecipeName(recipeUrl)}_${
      project.count
    }`;

    await fs.copy(
      path.join(getAppDataPath(), Package.name, getRecipeName(recipeUrl)),
      path.join('judip_recipes', blockname)
    );

    const recipe = await fs.readJson(
      path.join('judip_recipes', blockname, 'recipe.json')
    );

    const templatePaths = recipe.hbs || ['Dockerfile'];

    for (let templatePath of templatePaths) {
      const data = await fs.readFile(
        path.join('judip_recipes', blockname, templatePath),
        'utf8'
      );
      const template = hbs.compile(data);
      await fs.writeFile(
        path.join('judip_recipes', blockname, templatePath),
        template(JSON.parse(outputs))
      );
    }

    const codeblock: ICodeBlock = {
      name: recipe.name || recipeUrl.split('__')[2],
      recipe: recipeUrl,
      id: project.count,
      tabs: [],
      outputs: JSON.parse(outputs),
      logs: '',
    };

    for (let entryPath of recipe.entry) {
      if (entryPath === 'console') {
        codeblock.tabs.push({
          type: 'console',
          value: '',
        });
      } else {
        const value = await fs.readFile(
          path.join('judip_recipes', blockname, entryPath),
          'utf8'
        );

        codeblock.tabs.push({
          type: 'code',
          path: entryPath,
          value,
        });
      }
    }

    project.blocks.push(codeblock);
    await fs.writeJson('judip.json', project);
    console.log(
      `Successfully added recipe ${recipeUrl} in project ${project.name}`
    );

    if (recipe.execute) {
      for (let i in recipe.execute) {
        const template = hbs.compile(recipe.execute[i]);
        recipe.execute[i] = template({ project, block: codeblock });
      }
    } else {
      recipe.execute = [
        `docker build -t ${blockname} .`,
        `docker run --rm --name ${blockname} ${blockname}`,
      ];
    }

    if (recipe.execute_background) {
      for (let i in recipe.execute_background) {
        const template = hbs.compile(recipe.execute_background[i]);
        recipe.execute_background[i] = template({ project, block: codeblock });
      }
    } else {
      recipe.execute_background = [
        `docker build -t ${blockname} .`,
        `docker run -d --name ${blockname} ${blockname}`,
      ];
    }

    await fs.writeJson(
      path.join('judip_recipes', blockname, 'recipe.json'),
      recipe
    );

    if (build) {
      const docker_build = child_process.spawn(
        'docker',
        ['build', '-t', blockname, '.'],
        {
          cwd: path.join('judip_recipes', blockname),
        }
      );

      docker_build.stdout.on('data', (data) => console.log(data.toString()));
      docker_build.stderr.on('data', (data) => console.error(data.toString()));
    }
  } catch (err) {
    console.log(err);
  }
};
