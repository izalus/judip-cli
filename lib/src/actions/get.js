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
exports.get = exports.getInputs = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var package_json_1 = __importDefault(require("../../package.json"));
var utils_1 = require("../utils");
exports.getInputs = function (inputs, details) {
    var res = [];
    Object.keys(inputs).forEach(function (key) {
        var input = inputs[key];
        var element = utils_1.getInput(input);
        var _a = details[key] || {}, _b = _a.label, label = _b === void 0 ? key : _b, _c = _a.placeholder, placeholder = _c === void 0 ? '' : _c, _d = _a.optional, optional = _d === void 0 ? false : _d, _e = _a.value, value = _e === void 0 ? '' : _e;
        if (element !== null) {
            if (element === 'input' && typeof value === 'string') {
                res.push({
                    element: element,
                    type: 'text',
                    name: key,
                    label: label,
                    value: value,
                    optional: optional,
                    placeholder: placeholder,
                });
            }
            else if (element === 'textarea' && typeof value === 'string') {
                res.push({
                    element: element,
                    name: key,
                    label: label,
                    value: value,
                    optional: optional,
                    placeholder: placeholder,
                });
            }
            else if (element === 'radio' &&
                input instanceof Array &&
                typeof value === 'string') {
                var optionLabels_1 = ['', ''];
                var options_1 = ['', ''];
                input.forEach(function (val, i) {
                    if (typeof val === 'string') {
                        optionLabels_1[i] = val;
                        options_1[i] = val;
                    }
                    else {
                        optionLabels_1[i] = val[0];
                        options_1[i] = val[1];
                    }
                });
                res.push({
                    element: element,
                    name: key,
                    optionLabels: optionLabels_1,
                    options: options_1,
                    value: value,
                    optional: optional,
                    label: label,
                });
            }
            else if (element === 'select' &&
                input instanceof Array &&
                typeof value === 'string') {
                var optionLabels_2 = [
                    '',
                    '',
                    '',
                ];
                var options_2 = [
                    '',
                    '',
                    '',
                ];
                input.forEach(function (val, i) {
                    var newKey = typeof val === 'string' ? val : val[0];
                    var newValue = typeof val === 'string' ? val : val[1];
                    if (i < optionLabels_2.length) {
                        optionLabels_2[i] = newKey;
                        options_2[i] = newValue;
                    }
                    else {
                        optionLabels_2.push(newKey);
                        options_2.push(newValue);
                    }
                });
                res.push({
                    element: 'select',
                    name: key,
                    optionLabels: optionLabels_2,
                    options: options_2,
                    value: value,
                    optional: optional,
                    label: label,
                });
            }
            else if (element === 'checkbox') {
                res.push({
                    element: element,
                    name: key,
                    label: label,
                    value: Boolean(value),
                    optional: optional,
                });
            }
        }
    });
    return res;
};
exports.get = function (recipe) { return __awaiter(void 0, void 0, void 0, function () {
    var recipePath, data, recipeData, inputs, details, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                recipePath = path_1.default.join(utils_1.getAppDataPath(), package_json_1.default.name, utils_1.getRecipeName(recipe), 'recipe.json');
                return [4 /*yield*/, fs_extra_1.default.readFile(recipePath, 'utf8')];
            case 1:
                data = _a.sent();
                recipeData = JSON.parse(data);
                inputs = recipeData.inputs;
                details = recipeData.details || {};
                console.log(JSON.stringify(exports.getInputs(inputs, details)));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
