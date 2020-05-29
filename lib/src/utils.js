"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInput = exports.isSelect = exports.isRadio = exports.type = exports.getRecipeName = exports.getAppDataPath = void 0;
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
exports.isRadio = function (el) {
    return (exports.type(el) === 'array' && el.length === 2) ||
        (exports.type(el) === 'object' && Object.keys(el).length === 2);
};
exports.isSelect = function (el) {
    return (exports.type(el) === 'array' && el.length > 2) ||
        (exports.type(el) === 'object' &&
            Object.keys(el).length > 2 &&
            !('label' in el) &&
            !('optional' in el) &&
            !('options' in el) &&
            !('value' in el));
};
exports.getInput = function (el) {
    if (exports.type(el) === 'object' && [3, 4, 5].includes(Object.keys(el).length)) {
        if (Object.keys(el).length === 3) {
            return 'checkbox';
        }
        else if (Object.keys(el).length === 5) {
            return el.element;
        }
        else {
            return el.options.length === 2 ? 'radio' : 'select';
        }
    }
    return null;
};
