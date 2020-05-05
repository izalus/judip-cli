const { program } = require('commander');
const { version } = require('../package.json');

(() => {
  // VERSION
  program.version(version, '-v, --version', 'output the current version');

  // OPTIONS

  // COMMANDS
  program
    .command('create <name>')
    .option('-d, --dir <string>', 'output directory/folder')
    .description('Creates a new project/notebook in the specified folder')
    .action((name, { dir = '.' }) => {
      console.log({ name, dir });
    });

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
    .option(
      '-dc, --dontcache',
      'tells the cli to not pull any docker images and cache any builds'
    )
    .description('pulls and caches a recipe from github/gitlab/bitbucket')
    .action((recipe, { dontcache }) => {
      console.log({ recipe, dontcache });
    });

  program.parse(process.argv);
})();
