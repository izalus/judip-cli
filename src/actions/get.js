const fs = require('fs-extra');
const path = require('path');
const package = require('../../package.json');
const {
  getAppDataPath,
  getRecipeName,
  type,
  isRadio,
  isSelect,
  getInput,
} = require('../utils');

const getLongform = (inputs) => {
  const res = {};

  Object.keys(inputs).forEach((key) => {
    const value = inputs[key];

    if (value === 'string') {
      res[key] = {
        element: 'input',
        label: key,
        placeholder: '',
        value: '',
        optional: false,
      };
    } else if (value === 'boolean') {
      res[key] = {
        label: key,
        value: false,
        optional: false,
      };
    } else if (isRadio(value)) {
      res[key] = {
        label: key,
        optional: false,
        value:
          type(value) === 'object' ? value[Object.keys(value)[0]] : value[0],
        options: value,
      };
    } else if (isSelect(value)) {
      res[key] = {
        label: key,
        optional: false,
        value:
          type(value) === 'object' ? value[Object.keys(value)[0]] : value[0],
        options: value,
      };
    } else if (getInput(value)) {
      res[key] = value;
    }
  });

  return res;
};

const getInputs = (inputs) => {
  const res = [];

  Object.keys(inputs).forEach((key) => {
    const value = inputs[key];
    const element = getInput(value);

    if (element === 'input') {
      res.push({
        element,
        type: 'text',
        name: key,
        label: value.label,
        value: value.value + '',
        optional: value.optional,
        placeholder: value.placeholder + '',
      });
    } else if (element === 'textarea') {
      res.push({
        element,
        name: key,
        label: value.label,
        value: value.value + '',
        optional: value.optional,
        placeholder: value.placeholder + '',
      });
    } else if (element === 'select' || element === 'radio') {
      let options = [];
      let optionLabels = [];

      if (type(value.options) === 'array') {
        options = value.options.map((option) => option.toString());
        optionLabels = value.options.map((option) => option.toString());
      } else if (type(value.options) === 'object') {
        Object.keys(value.options).forEach((key) => {
          options.push(value.options[key]);
          optionLabels.push(key);
        });
      }

      res.push({
        element,
        name: key,
        optionLabels,
        options,
        value: value.value + '',
        optional: value.optional,
        label: value.label,
      });
    } else if (element === 'checkbox') {
      res.push({
        element,
        name: key,
        label: value.label,
        value: value.value,
        optional: value.optional,
      });
    }
  });

  return res;
};

const get = async (recipe) => {
  try {
    const recipePath = path.join(
      getAppDataPath(),
      package.name,
      getRecipeName(recipe),
      'recipe.json'
    );

    const data = await fs.readFile(recipePath, 'utf8');
    const recipeData = JSON.parse(data);
    console.log(JSON.stringify(getInputs(getLongform(recipeData.inputs))));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getInputs,
  getLongform,
  get,
};
