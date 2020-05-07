const getAppDataPath = () =>
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

const getRecipeName = (recipe) => {
  const parts = recipe.split('/');
  return `${parts[2].split('.')[0]}__${parts[3]}__${parts[4]}`;
};

const type = (element) =>
  Object.prototype.toString
    .call(element)
    .split(' ')[1]
    .slice(0, -1)
    .toLowerCase();

const isRadio = (el) =>
  (type(el) === 'array' && el.length === 2) ||
  (type(el) === 'object' && Object.keys(el).length === 2);

const isSelect = (el) =>
  (type(el) === 'array' && el.length > 2) ||
  (type(el) === 'object' &&
    Object.keys(el).length > 2 &&
    !('label' in el) &&
    !('optional' in el) &&
    !('options' in el) &&
    !('value' in el));

const getInput = (el) => {
  if (type(el) === 'object' && [3, 4, 5].includes(Object.keys(el).length)) {
    if (Object.keys(el).length === 3) {
      return 'checkbox';
    } else if (Object.keys(el).length === 5) {
      return el.element;
    } else {
      return el.options.length === 2 ? 'radio' : 'select';
    }
  }

  return null;
};

module.exports = {
  getAppDataPath,
  getRecipeName,
  type,
  isRadio,
  isSelect,
  getInput,
};
