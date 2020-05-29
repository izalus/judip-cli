export const getAppDataPath = () =>
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

export const getRecipeName = (recipe: string) => {
  const parts = recipe.toLowerCase().split('/');
  return `${parts[2].split('.')[0]}__${parts[3]}__${parts[4]}`;
};

export const type = (element: any): string =>
  Object.prototype.toString
    .call(element)
    .split(' ')[1]
    .slice(0, -1)
    .toLowerCase();

export const getInput = (el: any) => {
  if (el === 'boolean' || type(el) === 'boolean') {
    return 'checkbox';
  }
  if (el === 'string' || type(el) === 'string') {
    return 'input';
  }
  if (type(el) === 'array' && el.length === 2) {
    return 'radio';
  }
  if (type(el) === 'array' && el.length > 2) {
    return 'select';
  }

  return null;
};
