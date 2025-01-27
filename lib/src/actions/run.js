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
exports.run = exports.runBlock = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var child_process_1 = __importDefault(require("child_process"));
var util_1 = __importDefault(require("util"));
var utils_1 = require("../utils");
var save_1 = require("./save");
var clean_1 = require("./clean");
var exec = util_1.default.promisify(child_process_1.default.exec);
exports.runBlock = function (background, project, index) { return __awaiter(void 0, void 0, void 0, function () {
    var blockname, recipe, commands, logs, _a, _b, _i, i, stdout, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                blockname = project.id + "_" + utils_1.getRecipeName(project.blocks[index].recipe) + "_" + project.blocks[index].id;
                return [4 /*yield*/, fs_extra_1.default.readJson(path_1.default.join('judip_recipes', blockname, 'recipe.json'))];
            case 1:
                recipe = _c.sent();
                commands = recipe.execute;
                if (background) {
                    commands = recipe.execute_background;
                }
                logs = '';
                _a = [];
                for (_b in commands)
                    _a.push(_b);
                _i = 0;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                i = _a[_i];
                return [4 /*yield*/, exec(commands[i], {
                        cwd: path_1.default.join('judip_recipes', blockname),
                    })];
            case 3:
                stdout = (_c.sent()).stdout;
                console.log(stdout);
                logs += stdout;
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                project.blocks[index].logs = logs;
                return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                console.log(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.run = function (block, background) { return __awaiter(void 0, void 0, void 0, function () {
    var project, index_1, _a, _b, _i, index, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 13, , 14]);
                return [4 /*yield*/, clean_1.clean()];
            case 1:
                _c.sent();
                return [4 /*yield*/, save_1.save(block)];
            case 2:
                _c.sent();
                return [4 /*yield*/, fs_extra_1.default.readJson('judip.json')];
            case 3:
                project = _c.sent();
                if (!block) return [3 /*break*/, 7];
                index_1 = -1;
                project.blocks.forEach(function (_a, i) {
                    var id = _a.id;
                    if (block === id.toString()) {
                        index_1 = i;
                    }
                });
                if (!(index_1 != -1)) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.runBlock(background, project, index_1)];
            case 4:
                _c.sent();
                return [3 /*break*/, 6];
            case 5:
                console.log('Error: Unable to find block with index ' + block);
                _c.label = 6;
            case 6: return [3 /*break*/, 11];
            case 7:
                _a = [];
                for (_b in project.blocks)
                    _a.push(_b);
                _i = 0;
                _c.label = 8;
            case 8:
                if (!(_i < _a.length)) return [3 /*break*/, 11];
                index = _a[_i];
                return [4 /*yield*/, exports.runBlock(background, project, parseInt(index))];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11: return [4 /*yield*/, fs_extra_1.default.writeFile('judip.json', JSON.stringify(project, null, 2))];
            case 12:
                _c.sent();
                return [3 /*break*/, 14];
            case 13:
                err_2 = _c.sent();
                console.log(err_2);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
