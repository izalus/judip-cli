exports.getAppDataPath = () =>
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

exports.getRecipeName = (recipe) => {
  const parts = recipe.split('/');
  return `${parts[2].split('.')[0]}__${parts[3]}__${parts[4]}`;
};
