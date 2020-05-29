import { program } from 'commander';
import { version } from '../package.json';
import { create } from './actions/create';
import { pull } from './actions/pull';
import { get } from './actions/get';
import { sync } from './actions/sync';
import { add } from './actions/add';
import { save } from './actions/save';
import { run } from './actions/run';
import { clean } from './actions/clean';
import { remove } from './actions/remove';

(() => {
  // VERSION
  program.version(version, '-v, --version', 'output the current version');

  // COMMANDS
  program
    .command('create <name>')
    .option('-d, --dir <string>', 'output directory/folder')
    .description('Creates a new project/notebook in the specified folder')
    .action((name, { dir = '.' }) => create(name, dir));

  program
    .command('save')
    .option('-b, --block <id>', 'The id of the codeblock to be run')
    .description('Saves the content of the codeblocks into the recipe files')
    .action(({ block }) => save(block));

  program
    .command('run')
    .option('-b, --block <id>', 'The id of the codeblock to be run')
    .option('-bg, --background', 'keep running the container in the background')
    .description(
      "Runs the code in a project or in one of the project's codeblocks"
    )
    .action(({ block, background }) => run(block, background));

  program
    .command('pull <recipe>')
    .description('pulls and caches a recipe from github/gitlab/bitbucket')
    .action((recipe) => pull(recipe));

  program
    .command('add <recipe>')
    .requiredOption(
      '-o, --outputs <json>',
      'get the outputs to fill out the recipe template'
    )
    .option('-b, --build', 'build the recipe after adding it to the project')
    .description('adds a recipe to the current project')
    .action((recipe, { build, outputs }) => add(recipe, build, outputs));

  program
    .command('remove <blockId>')
    .description('removes a block with the specified id')
    .action((blockId) => remove(blockId));

  program
    .command('get <recipe>')
    .description('gets the inputs of a recipe in html compatible json format')
    .action((recipe) => get(recipe));

  program
    .command('sync')
    .description('pulls changes to all recipes (if any are available)')
    .action(() => sync());

  program
    .command('clean')
    .description('removes any dangling containers')
    .action(() => clean());

  program.parse(process.argv);
})();
