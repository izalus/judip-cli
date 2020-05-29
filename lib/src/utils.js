"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInput = exports.type = exports.getRecipeName = exports.getAppDataPath = void 0;
exports.getAppDataPath = function () {
    return process.env.APPDATA ||
        (process.platform == 'darwin'
            ? process.env.HOME + '/Library/Preferences'
            : process.env.HOME + '/.local/share');
};
exports.getRecipeName = function (recipe) {
    var parts = recipe.toLowerCase().split('/');
    return parts[2].split('.')[0] + "__" + parts[3] + "__" + parts[4];
};
exports.type = function (element) {
    return Object.prototype.toString
        .call(element)
        .split(' ')[1]
        .slice(0, -1)
        .toLowerCase();
};
exports.getInput = function (el) {
    if (el === 'boolean' || exports.type(el) === 'boolean') {
        return 'checkbox';
    }
    if (el === 'string' || exports.type(el) === 'string') {
        return 'input';
    }
    if (exports.type(el) === 'array' && el.length === 2) {
        return 'radio';
    }
    if (exports.type(el) === 'array' && el.length > 2) {
        return 'select';
    }
    return null;
};
