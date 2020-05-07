const path = require('path');
const fs = require('fs-extra');
const child_process = require('child_process');
const util = require('util');
const hbs = require('handlebars');
const { getRecipeName, getAppDataPath } = require('../utils');
const package = require('../../package.json');

const exec = util.promisify(child_process.exec);

exports.add = async (recipeUrl, build, outputs) => {
  try {
    const project = await fs.readJson('judip.json');
    const blockname = `${project.id}_${getRecipeName(recipeUrl)}_${
      project.blocks.length + 1
    }`;

    await fs.copy(
      path.join(getAppDataPath(), package.name, getRecipeName(recipeUrl)),
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

    const codeblock = {
      name: recipe.name || recipeUrl.split('__')[2],
      recipe: recipeUrl,
      id: project.blocks.length + 1,
      tabs: [],
      outputs: JSON.parse(outputs),
    };

    recipe.entry.forEach((name) => {
      if (name === 'console') {
        codeblock.tabs.push({
          type: 'console',
          value: '',
        });
      } else {
        codeblock.tabs.push({
          type: 'code',
          name,
          value: '',
          logs: [],
        });
      }
    });

    project.blocks.push(codeblock);
    await fs.writeFile('judip.json', JSON.stringify(project, null, 2));
    console.log(
      `Successfully added recipe ${recipeUrl} in project ${project.name}`
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
