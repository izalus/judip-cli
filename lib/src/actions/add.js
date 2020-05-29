"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var child_process_1 = __importDefault(require("child_process"));
var handlebars_1 = __importDefault(require("handlebars"));
var utils_1 = require("../utils");
var package_json_1 = __importDefault(require("../../package.json"));
exports.add = function (recipeUrl, build, outputs) { return __awaiter(void 0, void 0, void 0, function () {
    var project, blockname, recipe, templatePaths, _i, templatePaths_1, templatePath, data, template, codeblock, _a, _b, entryPath, value, i, template, i, template, docker_build, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 16, , 17]);
                return [4 /*yield*/, fs_extra_1.default.readJson('judip.json')];
            case 1:
                project = _c.sent();
                project.count = project.count + 1;
                blockname = project.id + "_" + utils_1.getRecipeName(recipeUrl) + "_" + project.count;
                return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(utils_1.getAppDataPath(), package_json_1.default.name, utils_1.getRecipeName(recipeUrl)), path_1.default.join('judip_recipes', blockname))];
            case 2:
                _c.sent();
                return [4 /*yield*/, fs_extra_1.default.readJson(path_1.default.join('judip_recipes', blockname, 'recipe.json'))];
            case 3:
                recipe = _c.sent();
                templatePaths = recipe.hbs || ['Dockerfile'];
                _i = 0, templatePaths_1 = templatePaths;
                _c.label = 4;
            case 4:
                if (!(_i < templatePaths_1.length)) return [3 /*break*/, 8];
                templatePath = templatePaths_1[_i];
                return [4 /*yield*/, fs_extra_1.default.readFile(path_1.default.join('judip_recipes', blockname, templatePath), 'utf8')];
            case 5:
                data = _c.sent();
                template = handlebars_1.default.compile(data);
                return [4 /*yield*/, fs_extra_1.default.writeFile(path_1.default.join('judip_recipes', blockname, templatePath), template(JSON.parse(outputs)))];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 4];
            case 8:
                codeblock = {
                    name: recipe.name || recipeUrl.split('__')[2],
                    recipe: recipeUrl,
                    id: project.count,
                    tabs: [],
                    outputs: JSON.parse(outputs),
                    logs: '',
                };
                _a = 0, _b = recipe.entry;
                _c.label = 9;
            case 9:
                if (!(_a < _b.length)) return [3 /*break*/, 13];
                entryPath = _b[_a];
                if (!(entryPath === 'console')) return [3 /*break*/, 10];
                codeblock.tabs.push({
                    type: 'console',
                    value: '',
                });
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, fs_extra_1.default.readFile(path_1.default.join('judip_recipes', blockname, entryPath), 'utf8')];
            case 11:
                value = _c.sent();
                codeblock.tabs.push({
                    type: 'code',
                    path: entryPath,
                    value: value,
                });
                _c.label = 12;
            case 12:
                _a++;
                return [3 /*break*/, 9];
            case 13:
                project.blocks.push(codeblock);
                return [4 /*yield*/, fs_extra_1.default.writeFile('judip.json', JSON.stringify(project, null, 2))];
            case 14:
                _c.sent();
                console.log("Successfully added recipe " + recipeUrl + " in project " + project.name);
                if (recipe.execute) {
                    for (i in recipe.execute) {
                        template = handlebars_1.default.compile(recipe.execute[i]);
                        recipe.execute[i] = template({ project: project, block: codeblock });
                    }
                }
                else {
                    recipe.execute = [
                        "docker build -t " + blockname + " .",
                        "docker run --rm --name " + blockname + " " + blockname,
                    ];
                }
                if (recipe.execute_background) {
                    for (i in recipe.execute_background) {
                        template = handlebars_1.default.compile(recipe.execute_background[i]);
                        recipe.execute_background[i] = template({ project: project, block: codeblock });
                    }
                }
                else {
                    recipe.execute_background = [
                        "docker build -t " + blockname + " .",
                        "docker run -d --name " + blockname + " " + blockname,
                    ];
                }
                return [4 /*yield*/, fs_extra_1.default.writeFile(path_1.default.join('judip_recipes', blockname, 'recipe.json'), JSON.stringify(recipe, null, 2))];
            case 15:
                _c.sent();
                if (build) {
                    docker_build = child_process_1.default.spawn('docker', ['build', '-t', blockname, '.'], {
                        cwd: path_1.default.join('judip_recipes', blockname),
                    });
                    docker_build.stdout.on('data', function (data) { return console.log(data.toString()); });
                    docker_build.stderr.on('data', function (data) { return console.error(data.toString()); });
                }
                return [3 /*break*/, 17];
            case 16:
                err_1 = _c.sent();
                console.log(err_1);
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
