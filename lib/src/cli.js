"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var package_json_1 = require("../package.json");
var create_1 = require("./actions/create");
var pull_1 = require("./actions/pull");
var get_1 = require("./actions/get");
var sync_1 = require("./actions/sync");
var add_1 = require("./actions/add");
var save_1 = require("./actions/save");
var run_1 = require("./actions/run");
var clean_1 = require("./actions/clean");
var remove_1 = require("./actions/remove");
(function () {
    // VERSION
    commander_1.program.version(package_json_1.version, '-v, --version', 'output the current version');
    // COMMANDS
    commander_1.program
        .command('create <name>')
        .option('-d, --dir <string>', 'output directory/folder')
        .description('Creates a new project/notebook in the specified folder')
        .action(function (name, _a) {
        var _b = _a.dir, dir = _b === void 0 ? '.' : _b;
        return create_1.create(name, dir);
    });
    commander_1.program
        .command('save')
        .option('-b, --block <id>', 'The id of the codeblock to be run')
        .description('Saves the content of the codeblocks into the recipe files')
        .action(function (_a) {
        var block = _a.block;
        return save_1.save(block);
    });
    commander_1.program
        .command('run')
        .option('-b, --block <id>', 'The id of the codeblock to be run')
        .option('-bg, --background', 'keep running the container in the background')
        .description("Runs the code in a project or in one of the project's codeblocks")
        .action(function (_a) {
        var block = _a.block, background = _a.background;
        return run_1.run(block, background);
    });
    commander_1.program
        .command('pull <recipe>')
        .description('pulls and caches a recipe from github/gitlab/bitbucket')
        .action(function (recipe) { return pull_1.pull(recipe); });
    commander_1.program
        .command('add <recipe>')
        .requiredOption('-o, --outputs <json>', 'get the outputs to fill out the recipe template')
        .option('-b, --build', 'build the recipe after adding it to the project')
        .description('adds a recipe to the current project')
        .action(function (recipe, _a) {
        var build = _a.build, outputs = _a.outputs;
        return add_1.add(recipe, build, outputs);
    });
    commander_1.program
        .command('remove <blockId>')
        .description('removes a block with the specified id')
        .action(function (blockId) { return remove_1.remove(blockId); });
    commander_1.program
        .command('get <recipe>')
        .description('gets the inputs of a recipe in html compatible json format')
        .action(function (recipe) { return get_1.get(recipe); });
    commander_1.program
        .command('sync')
        .description('pulls changes to all recipes (if any are available)')
        .action(function () { return sync_1.sync(); });
    commander_1.program
        .command('clean')
        .description('removes any dangling containers')
        .action(function () { return clean_1.clean(); });
    commander_1.program.parse(process.argv);
})();
