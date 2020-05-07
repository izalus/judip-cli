const { program } = require('commander');
const { version } = require('../package.json');
const { create } = require('./actions/create');
const { pull } = require('./actions/pull');
const { get } = require('./actions/get');
const { sync } = require('./actions/sync');
const { add } = require('./actions/add');

(() => {
  // VERSION
  program.version(version, '-v, --version', 'output the current version');

  // OPTIONS

  // COMMANDS
  program
    .command('create <name>')
    .option('-d, --dir <string>', 'output directory/folder')
    .description('Creates a new project/notebook in the specified folder')
    .action((name, { dir = '.' }) => create(name, dir));

  program
    .command('run')
    .option('-f, --file <path>', 'The name of the file to be run')
    .option('-b, --block <id>', 'The id of the codeblock to be run')
    .description(
      "Runs the code in a project or in one of the project's codeblocks"
    )
    .action(({ file, block }) => {
      console.log({ file, block });
    });

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
    .command('get <recipe>')
    .description('gets the inputs of a recipe in html compatible json format')
    .action((recipe) => get(recipe));

  program
    .command('sync')
    .description('pulls changes to all recipes (if any are available)')
    .action(() => sync());

  program.parse(process.argv);
})();
